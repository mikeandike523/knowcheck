export class RPCError extends Error {
    static buildMessage({ status, logMessage, cause, userFacingMessage, }: {
        status: any;
        logMessage: any;
        cause?: any;
        userFacingMessage?: any;
    }): string;
    static is(obj: any): obj is RPCError;
    static isLike(obj: any): boolean;
    static wrap(obj: any, status?: number): any;
    constructor({ status, logMessage, cause, userFacingMessage, }: {
        status: any;
        logMessage: any;
        cause?: any;
        userFacingMessage?: any;
    });
    logMessage: any;
    status: any;
    cause: any;
    userFacingMessage: any;
    isUserFacing(): boolean;
    getLogMessage(): any;
    getUserFacingMessage(): any;
    toJSON(): {
        message: string;
        logMessage: any;
        status: any;
        cause: any;
        userFacingMessage: any;
        isUserFacing: boolean;
    };
}
export class TypicalRPCErrors {
    static InvalidAPIInputError(cause: any, ticketNumber: any): RPCError;
    static APIRouteNotFoundError(cause: any, ticketNumber: any): RPCError;
    static ThirdPartyConnectionError(service: any, cause: any, ticketNumber: any): RPCError;
    static UnknownServerError(cause: any, ticketNumber: any): RPCError;
    static MissingDataError(cause: any, ticketNumber: any): RPCError;
}
export class TyipcalUserFacingErrorMessages extends Error {
    static GeneralServerError(explanation: any, ticketNumber: any): any;
}
