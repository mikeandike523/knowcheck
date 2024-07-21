/**
 * Easily handle the complexity of cookie management in Express.js, preserving as much
 * information as possible in incoming and outgoing cookies.
 * 
 * @remarks
 * This class sits somewhere between low-level and high-level cookie handling.
 * There is no involvement of JSON serialization or deserialization.
 * There are no opinionated default settings for cookies or the ability to set default options.
 * 
 * If you want a more comprehensive cookie management system,
 * leveraging JSON to represent complex data,
 * and the ability to specify default options for cookies,
 * consider using "./CookieEngine.js".
 * 
 * @remarks
 * In this class, cookie values can either be strings or undefined if absent.
 * Do NOT use null, numerical, boolean, object, or any other types.
 * If you want to represent complex information, consider using "./CookieEngine.js".
 */

import { serialize, parse } from 'cookie';

/**
 * @typedef {object} CookieOptions
 * @property {string} [domain]
 * @property {string} [path]
 * @property {number} [maxAge]
 * @property {boolean} [httpOnly]
 * @property {boolean} [secure]
 * @property {boolean} [sameSite]
 * @property {Date} [expires]
 */

/**
 * @typedef {object} CookieInfo
 * @property {string} name
 * @property {string} value
 * @property {CookieOptions} [options]
 */

/**
 * Parses the cookie header to obtain as much useful information as possible.
 * @param {string} headerText
 * @returns {Map<string, CookieInfo>}
 */
function parseCookieHeader(headerText) {
  if (!headerText) {
    return new Map();
  }
  const cookies = parse(headerText);
  const cookieMap = new Map();
  
  for (const [name, value] of Object.entries(cookies)) {
    cookieMap.set(name, { name, value, options: {} });
  }
  
  return cookieMap;
}

/**
 * Class to manage cookies in Express.js.
 */
export default class CookieManager {
  /**
   * @param {import('express').Request} req - The HTTP request object.
   * @param {import('express').Response} res - The HTTP response object.
   */
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.cookieChanges = new Map();
    this.existingCookies = parseCookieHeader(this.req.headers.cookie??"");
  }

  /**
   * 
   * @returns {string|undefined}
   */
  getBearer(){
    const authorization = this.req.headers["authorization"]??""
    if(authorization.startsWith("Bearer")){
      return authorization.slice("Bearer ".length)
    }
    return undefined
  }

  /**
   * Commits the staged cookie changes to the response header.
   */
  commit() {
    const changedCookies = this.cookieChanges.keys();
    const commands = [];
    
    for (const cookieName of changedCookies) {
      const cookieChange = this.cookieChanges.get(cookieName);
      commands.push(serialize(cookieName, cookieChange.value, cookieChange.options));
    }
    
    this.res.setHeader('Set-Cookie', commands);
  }

  /**
   * Gets a cookie value by name, or undefined if not found.
   * 
   * @param {string} name - The name of the cookie.
   * @returns {string | undefined} The value of the cookie, or undefined if not found.
   */
  getCookie(name) {
    const cookieInfo = this.existingCookies.get(name);
    return cookieInfo ? cookieInfo.value : undefined;
  }

  /**
   * Sets the value and options of a cookie by name.
   * 
   * @param {string} name - The name of the cookie.
   * @param {string} value - The value of the cookie.
   * @param {CookieOptions} [options={}] - The cookie options.
   */
  setCookie(name, value, options = {}) {
    this.cookieChanges.set(name, { value, options });
  }

  /**
   * Removes a cookie by name.
   * 
   * @param {string} name - The name of the cookie.
   */
  clearCookie(name) {
    if (!this.hasCookie(name)) {
      return;
    }
    
    const existingOptions = this.existingCookies.get(name)?.options ?? {};
    this.cookieChanges.set(name, {
      value: "",
      options: {
        ...existingOptions,
        expires: new Date(0),
        maxAge: 0,
      },
    });
    this.existingCookies.delete(name);
  }

  /**
   * Lists the names of all existing cookies.
   * 
   * @returns {IterableIterator<string>} The names of all existing cookies.
   */
  listCookies() {
    return this.existingCookies.keys();
  }

  /**
   * Checks if a cookie exists by name.
   * 
   * @param {string} name - The name of the cookie.
   * @returns {boolean} True if the cookie exists, false otherwise.
   */
  hasCookie(name) {
    return this.existingCookies.has(name);
  }
}