// !! copy-to-frontend

// Takes an value, including types such as `Error` or recursive types,
// and safely converts it to its nearest useful plain object representation

import * as fe from "./formatError.js";
const formatError = fe.default;

class FetchError extends Error {
  constructor(url, method, statusCode, statusText, text) {
    super(`
Request to ${url} using method ${method} failed with status code ${statusCode} (${statusText}):

${text}
        `);
    this.name = "FetchError";
    this.statusCode = statusCode;
    this.text = text;
    // If the response data is json, might as well try to parse it
    try {
      this.data = JSON.parse(text);
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
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.token = undefined;
  }
  route(path) {
    this.baseUrl = `${this.baseUrl}/${path}`;
    return this;
  }

  bearer(token) {
    this.token = token;
    return this;
  }

  async request(method, args) {
    let finalUrl = this.baseUrl;
    if (method === "get" || method === "delete") {
      if (!finalUrl.includes("?")) {
        finalUrl += "?";
      } else {
        finalUrl += "&";
      }
      finalUrl += new URLSearchParams(args).toString();
    }
    const response = await fetch(finalUrl, {
      mode: "cors",
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token ? `Bearer ${this.token}` : undefined,
      },
      body:
        method.toUpperCase() !== "GET" && method.toUpperCase() !== "DELETE"
          ? JSON.stringify(args ?? {})
          : undefined,
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
        responseText,
      );
    }
  }

  async get(args) {
    return await this.request("GET", args);
  }
  async post(args) {
    return await this.request("POST", args);
  }
  async put(args) {
    return await this.request("PUT", args);
  }
  async delete(args) {
    return await this.request("DELETE", args);
  }
}

export {
  SmartFetch,
  FetchError,
  InvalidJSONError,
}

