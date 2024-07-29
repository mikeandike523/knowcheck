import lodash from "lodash";

import formatError from "./formatError.js";

class FetchError extends Error {
  /**
   *
   * @param {string} url
   * @param {string} method
   * @param {number} statusCode
   * @param {string|undefined} statusText
   * @param {string|undefined} text
   */
  constructor(url, method, statusCode, statusText, text) {
    super(`
Request to ${url} using method ${method} failed with status code ${statusCode} (${statusText}):

${text}
        `);
    this.name = "FetchError";
    this.statusCode = statusCode;
    this.text = text;
    try {
      if (text) {
        this.data = JSON.parse(text);
      }
    } catch (e) {
      console.warn(`
Got a bad response from the server and the text was not JSON parsable.
This may indicate that there is an error in the overall communication between client and server, as opposed
to a known error condition (such as bad auth token) which are typically reported as JSON by well established APIs.

Code: ${statusCode} (${statusText})

Text:

${this.text}
            `);
      this.data = undefined;
    }
  }
}

class InvalidJSONError extends Error {
  /**
   *
   * @param {*} text   - The original text that was not valid JSON.
   * @param {*} reason - Typically the error in the catch clause.
   *                     Will be converted to its nearest plain object representation.
   */
  constructor(text, reason) {
    const message = `Got text that was not valid JSON:\n${text}`;
    super(message);
    this.text = text;
    this.name = "InvalidJSONError";
    this.reason = formatError(reason);
  }
}

class SmartFetch {
  /**
   * @param {string} baseUrl
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.token = undefined;
  }

  /**
   *
   * @param {string} path
   * @returns
   */
  route(path) {
    this.baseUrl = `${this.baseUrl}/${path}`;
    return this;
  }

  /**
   *
   * @param {string|undefined} [token=undefined]
   * @returns
   */
  bearer(token) {
    if (token) {
      this.token = token;
    }
    return this;
  }

  /**
   *
   * @param {string} method
   * @param {any} args
   * @param {RequestInit} [options={}]
   * @returns
   */
  async request(method, args, options = {}) {
    if (
      !["GET", "POST", "PUT", "DELETE", "OPTIONS"].includes(
        method.toUpperCase()
      )
    ) {
      throw new Error(`Unsupported method: ${method}`);
    }
    let finalUrl = this.baseUrl;
    /**
     * Whether the body is supported/included in the request
     *
     * @remarks
     * technically any request can have a body, here we make an OPINION about typical use cases
     */
    const bodyIsSupported =
      method.toUpperCase() === "PUT" || method.toUpperCase() === "POST";
    /**
     * If the request should ot hav ea body, we do allow args to serve as query parameters
     * if it is present and is a valid object
     */
    if (!bodyIsSupported) {
      if (typeof args === "object" && args !== null) {
        if (!finalUrl.includes("?")) {
          finalUrl += "?";
        } else {
          finalUrl += "&";
        }
        finalUrl += new URLSearchParams(args).toString();
      }
    }
    /**
     * @type {Record<string,string>}
     */
    const givenHeaders = {}
    if(typeof options.headers === "object" && options.headers!== null) {
      Object.assign(givenHeaders, options.headers);
    }
    const contentType = givenHeaders["Content-Type"] ?? "application/json";
    const remainingHeaders = lodash.omit(givenHeaders, ["Content-Type", "Authorization"]);
    const response = await fetch(finalUrl, {
      mode: "cors",
      method: method.toLowerCase(),
      headers: {
        "Content-Type": contentType,
        ...(this.token
          ? {
              Authorization: `Bearer ${this.token}`,
            }
          : {}),
        ...remainingHeaders,
      },
      // Logic
      // If body is supported
      // If the content type is JSON (default)
      // We simply attempt to stringgify it
      // In other cases
      // If args is a string, then it becomes the body
      // If args is undefined, then we attempt to look for a body in options
      // In all other cases, leave the body undefined

      body: bodyIsSupported
        ? contentType === "application/json"
          ? JSON.stringify(args??{})
          : typeof args === "string"
            ? args
            : (options.body ?? undefined)
        : undefined,
      ...lodash.omit(options, ["headers", "mode", "body"]),
    });
    const responseText = await response.text();
    if (response.ok) {
      try {
        return JSON.parse(responseText);
      } catch (e) {
        throw new InvalidJSONError(responseText, e);
      }
    } else {
      throw new FetchError(
        this.baseUrl,
        method,
        response.status,
        response.statusText,
        responseText
      );
    }
  }

  /**
   *
   * @param {any} args
   * @param {RequestInit} [options={}]
   * @returns {Promise<any>}
   */
  async get(args, options = {}) {
    return await this.request("GET", args, options);
  }

  /**
   *
   * @param {any} args
   * @param {RequestInit} [options={}]
   * @returns {Promise<any>}
   */
  async post(args, options = {}) {
    return await this.request("POST", args, options);
  }

  /**
   *
   * @param {any} args
   * @param {RequestInit} [options={}]
   * @returns {Promise<any>}
   */
  async put(args, options = {}) {
    return await this.request("PUT", args, options);
  }

  /**
   *
   * @param {any} args
   * @param {RequestInit} [options={}]
   * @returns {Promise<any>}
   */
  async delete(args, options = {}) {
    return await this.request("DELETE", args, options);
  }
}

export { SmartFetch, FetchError, InvalidJSONError };
