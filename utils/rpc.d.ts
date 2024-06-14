declare class RPCError extends Error {
  logMessage: string;
  status: number;
  cause: any;
  userFacingMessage?: string;

  constructor({
    status,
    logMessage,
    cause,
    userFacingMessage,
  }: {
    status: number;
    logMessage: string;
    cause?: any;
    userFacingMessage?: string;
  });

  static buildMessage({
    status,
    logMessage,
    cause,
    userFacingMessage,
  }: {
    status: number;
    logMessage: string;
    cause?: any;
    userFacingMessage?: string;
  }): string;

  isUserFacing(): boolean;
  getLogMessage(): string;
  getUserFacingMessage(): string | undefined;
  toJSON(): {
    message: string;
    logMessage: string;
    status: number;
    cause: any;
    userFacingMessage?: string;
    isUserFacing: boolean;
  };
  toString(): string;
  static is(obj: any): obj is RPCError;
  static isLike(obj: any): boolean;
  static wrap(obj: any, status?: number): RPCError;
}

export {
    RPCError,
}
