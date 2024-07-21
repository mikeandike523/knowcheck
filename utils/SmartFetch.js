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
      if(text){
        this.data = JSON.parse(text)
      
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
    if(token){
      this.token = token
    }
    return this
  }

  /**
   * 
   * @param {string} method 
   * @param {any} args 
   * @returns 
   */
  async request(method, args) {
    let finalUrl = this.baseUrl;
    if (method.toLowerCase() === "get" || method.toLowerCase() === "delete") {
      if (!finalUrl.includes("?")) {
        finalUrl += "?";
      } else {
        finalUrl += "&";
      }
      finalUrl += new URLSearchParams(args).toString();
    }
    const response = await fetch(finalUrl, {
      mode: "cors",
      method:method.toLowerCase(),
      headers: {
        "Content-Type": "application/json",
        ...(this.token
          ? {
              Authorization: `Bearer ${this.token}`,
            }
          : {}),
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
        responseText
      );
    }
  }

  /**
   *
   * @param {any} args
   * @returns {Promise<any>}
   */
  async get(args) {
    return await this.request("GET", args);
  }

  /**
   *
   * @param {any} args
   * @returns {Promise<any>}
   */
  async post(args) {
    return await this.request("POST", args);
  }

  /**
   *
   * @param {any} args
   * @returns {Promise<any>}
   */
  async put(args) {
    return await this.request("PUT", args);
  }

  /**
   *
   * @param {any} args
   * @returns {Promise<any>}
   */
  async delete(args) {
    return await this.request("DELETE", args);
  }
}

export { SmartFetch, FetchError, InvalidJSONError };
