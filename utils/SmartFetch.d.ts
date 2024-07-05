export class SmartFetch {
    constructor(baseUrl: any);
    baseUrl: any;
    token: any;
    route(path: any): this;
    bearer(token: any): this;
    request(method: any, args: any): Promise<any>;
    get(args: any): Promise<any>;
    post(args: any): Promise<any>;
    put(args: any): Promise<any>;
    delete(args: any): Promise<any>;
}
export class FetchError extends Error {
    constructor(url: any, method: any, statusCode: any, statusText: any, text: any);
    statusCode: any;
    text: any;
    data: any;
}
export class InvalidJSONError extends Error {
    /**
     *
     * @param {*} text   - The original text that was not valid JSON.
     * @param {*} reason - Typically the error in the catch clause.
     *                     Will be converted to its nearest plain object representation.
     */
    constructor(text: any, reason: any);
    text: any;
    reason: any;
}
