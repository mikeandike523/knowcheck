/**
 * Enhanced cookie management system leveraging JSON serialization and deserialization,
 * and the ability to specify default options for cookies.
 */

import CookieManager from './CookieManager.js';

/**
 * @typedef {import('./CookieManager.js').CookieOptions} CookieOptions
 */

class CookieEngine {
  /**
   * @param {import('express').Request} req - The HTTP request object.
   * @param {import('express').Response} res - The HTTP response object.
   * @param {CookieOptions} [defaultOptions={}] - The default options for cookies.
   */
  constructor(req, res, defaultOptions = {}) {
    this.cookieManager = new CookieManager(req, res);
    this.defaultOptions = defaultOptions;
  }

  /**
   * Gets a cookie value by name and parses it as JSON.
   * 
   * @param {string} name - The name of the cookie.
   * @returns {any | undefined} The parsed value of the cookie, or undefined if not found.
   */
  getCookie(name) {
    const value = this.cookieManager.getCookie(name);
    if (value === undefined) {
      return undefined;
    }
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error(`Failed to parse cookie value for ${name}:`, e);
      return undefined;
    }
  }

  /**
   * Sets the value and options of a cookie by name, serializing the value as JSON.
   * 
   * @param {string} name - The name of the cookie.
   * @param {any} value - The value of the cookie.
   * @param {CookieOptions} [options={}] - The cookie options.
   */
  setCookie(name, value, options = {}) {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const serializedValue = JSON.stringify(value);
    this.cookieManager.setCookie(name, serializedValue, mergedOptions);
  }

  /**
   * Removes a cookie by name.
   * 
   * @param {string} name - The name of the cookie.
   */
  clearCookie(name) {
    this.cookieManager.clearCookie(name);
  }

  /**
   * Lists the names of all existing cookies.
   * 
   * @returns {IterableIterator<string>} The names of all existing cookies.
   */
  listCookies() {
    return this.cookieManager.listCookies();
  }

  /**
   * Commits the staged cookie changes to the response header.
   */
  commit() {
    this.cookieManager.commit();
  }

  /**
   * Checks if a cookie exists by name.
   * 
   * @param {string} name - The name of the cookie.
   * @returns {boolean} True if the cookie exists, false otherwise.
   */
  hasCookie(name) {
    return this.cookieManager.hasCookie(name);
  }
}

export default CookieEngine;