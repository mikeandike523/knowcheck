/**
 * Class to manage cookies in Express.js.
 */
export default class CookieManager {
    /**
     * @param {import('express').Request} req - The HTTP request object.
     * @param {import('express').Response} res - The HTTP response object.
     */
    constructor(req: import("express").Request, res: import("express").Response);
    req: import("express").Request<import(".pnpm/@types+express-serve-static-core@4.19.5/node_modules/@types/express-serve-static-core").ParamsDictionary, any, any, import(".pnpm/@types+qs@6.9.15/node_modules/@types/qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    cookieChanges: Map<any, any>;
    existingCookies: Map<string, CookieInfo>;
    /**
     *
     * @returns {string|undefined}
     */
    getBearer(): string | undefined;
    /**
     * Commits the staged cookie changes to the response header.
     */
    commit(): void;
    /**
     * Gets a cookie value by name, or undefined if not found.
     *
     * @param {string} name - The name of the cookie.
     * @returns {string | undefined} The value of the cookie, or undefined if not found.
     */
    getCookie(name: string): string | undefined;
    /**
     * Sets the value and options of a cookie by name.
     *
     * @param {string} name - The name of the cookie.
     * @param {string} value - The value of the cookie.
     * @param {CookieOptions} [options={}] - The cookie options.
     */
    setCookie(name: string, value: string, options?: CookieOptions): void;
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
     * Checks if a cookie exists by name.
     *
     * @param {string} name - The name of the cookie.
     * @returns {boolean} True if the cookie exists, false otherwise.
     */
    hasCookie(name: string): boolean;
}
export type CookieOptions = {
    domain?: string;
    path?: string;
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: boolean;
    expires?: Date;
};
export type CookieInfo = {
    name: string;
    value: string;
    options?: CookieOptions;
};
