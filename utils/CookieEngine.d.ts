export default CookieEngine;
export type CookieOptions = import("./CookieManager.js").CookieOptions;
/**
 * @typedef {import('./CookieManager.js').CookieOptions} CookieOptions
 */
declare class CookieEngine {
    /**
     * @param {import('express').Request} req - The HTTP request object.
     * @param {import('express').Response} res - The HTTP response object.
     * @param {CookieOptions} [defaultOptions={}] - The default options for cookies.
     */
    constructor(req: import("express").Request, res: import("express").Response, defaultOptions?: CookieOptions);
    cookieManager: CookieManager;
    defaultOptions: import("./CookieManager.js").CookieOptions;
    /**
     * Gets a cookie value by name and parses it as JSON.
     *
     * @param {string} name - The name of the cookie.
     * @returns {any | undefined} The parsed value of the cookie, or undefined if not found.
     */
    getCookie(name: string): any | undefined;
    /**
     * Sets the value and options of a cookie by name, serializing the value as JSON.
     *
     * @param {string} name - The name of the cookie.
     * @param {any} value - The value of the cookie.
     * @param {CookieOptions} [options={}] - The cookie options.
     */
    setCookie(name: string, value: any, options?: CookieOptions): void;
    /**
     * Removes a cookie by name.
     *
     * @param {string} name - The name of the cookie.
     */
    clearCookie(name: string): void;
    /**
     * Lists the names of all existing cookies.
     *
     * @returns {IterableIterator<string>} The names of all existing cookies.
     */
    listCookies(): IterableIterator<string>;
    /**
     * Commits the staged cookie changes to the response header.
     */
    commit(): void;
    /**
     * Checks if a cookie exists by name.
     *
     * @param {string} name - The name of the cookie.
     * @returns {boolean} True if the cookie exists, false otherwise.
     */
    hasCookie(name: string): boolean;
}
import CookieManager from './CookieManager.js';
