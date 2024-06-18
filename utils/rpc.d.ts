declare module "./formatError.js" {
  const formatError: (error: any) => any;
  export default formatError;
}

declare module "./dedentTrim.js" {
  const dedentTrim: (strings: TemplateStringsArray, ...values: any[]) => string;
  export default dedentTrim;
}

declare module "./indent.js" {
  const indent: (text: string, count: number) => string;
  export default indent;
}

declare module "./string-templating.js" {
  export function fillTemplate(template: string, values: string[]): string;
  export function escapeForTemplate(text: string): string;
}

interface RPCErrorConstructorParams {
  status: number;
  logMessage: string;
  cause?: any;
  userFacingMessage?: string;
}

declare class RPCError extends Error {
  logMessage: string;
  status: number;
  cause: any;
  userFacingMessage?: string;

  constructor(params: RPCErrorConstructorParams);

  static buildMessage(params: RPCErrorConstructorParams): string;

  isUserFacing(): boolean;
  getLogMessage(): string;
  getUserFacingMessage(): string;
  toJSON(): {
    message: string;
    logMessage: string;
    status: number;
    cause: any;
    userFacingMessage?: string;
    isUserFacing: boolean;
  };
  toString(): string;

  static is(obj: any): boolean;
  static isLike(obj: any): boolean;
  static wrap(obj: any, status?: number): RPCError;
}

declare class TyipcalUserFacingErrorMessages extends Error {
  static GeneralServerError(explanation: string, ticketNumber: string): string;
}

declare class TypicalRPCErrors {
  static InvalidAPIInputError(cause: any, ticketNumber: string): RPCError;
  static APIRouteNotFoundError(cause: any, ticketNumber: string): RPCError;
  static ThirdPartyConnectionError(service: string, cause: any, ticketNumber: string): RPCError;
  static UnknownServerError(cause: any, ticketNumber: string): RPCError;
  static MissingDataError(cause: any, ticketNumber: string): RPCError;
}

export {
  RPCError,
  TypicalRPCErrors,
  TyipcalUserFacingErrorMessages
}
