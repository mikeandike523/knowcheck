declare class FetchError extends Error {
    statusCode: number;
    text: string;
    data?: any;

    constructor(url: string, method: string, statusCode: number, statusText: string, text: string);
}

declare class InvalidJSONError extends Error {
    text: string;
    reason: any;

    constructor(text: string, reason: any);
}

declare class SmartFetch<TArgs = any, TReturn = any> {
    baseUrl: string;
    token?: string;

    constructor(baseUrl: string);

    route(path: string): this;

    bearer(token: string): this;

    request(method: string, args: TArgs): Promise<TReturn>;

    get(args: TArgs): Promise<TReturn>;

    post(args: TArgs): Promise<TReturn>;

    put(args: TArgs): Promise<TReturn>;

    delete(args: TArgs): Promise<TReturn>;
}

export {
    SmartFetch,
    FetchError,
    InvalidJSONError,
}
