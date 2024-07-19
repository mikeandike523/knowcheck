import * as fe from "./formatError.js";
const formatError = fe.default;
import * as dt from "./dedentTrim.js";
const dedentTrim = dt.default;

import * as idnt from "./indent.js";
const indent = idnt.default;
import * as st from "./string-templating.js";
const fillTemplate = st.fillTemplate;
const escapeForTemplate = st.escapeForTemplate;

class RPCError extends Error {

  static buildMessage({
    status,
    logMessage,
    cause = undefined,
    userFacingMessage = undefined,
  }) {
    return dedentTrim`
RPCError:
       
Status: ${status}

Log Message:
${logMessage}

User Facing Message:
${userFacingMessage}
    `;
  }

  constructor({
    status,
    logMessage,
    cause = undefined,
    userFacingMessage = undefined,
  }) {
    super(
      RPCError.buildMessage({
        status,
        logMessage,
        cause,
        userFacingMessage,
      }),
    );
    this.logMessage = logMessage;
    this.name = "RPCError";
    this.status = status;
    this.cause = formatError(cause);
    this.userFacingMessage = userFacingMessage;
  }

  isUserFacing() {
    return typeof this.userFacingMessage === "string";
  }

  getLogMessage() {
    return this.logMessage;
  }

  getUserFacingMessage() {
    return this.userFacingMessage;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      logMessage: this.logMessage,
      status: this.status,
      cause: this.cause,
      userFacingMessage: this.userFacingMessage,
      isUserFacing: this.isUserFacing(),
    };
  }

  toString() {
    return this.message;
  }

  static is(obj) {
    return obj instanceof RPCError;
  }
  static isLike(obj) {
    return (
      RPCError.is(obj) || (typeof obj === "object" && obj.name === "RPCError")
    );
  }
  static wrap(obj, status = 500) {
    if (RPCError.isLike(obj)) {
      return new RPCError({
        status:obj.status??status,
        logMessage: obj.logMessage,
        cause: obj.cause,
        userFacingMessage: obj.userFacingMessage,
      });
    }
    return new RPCError({
      status,
      logMessage: "Internal Server Error",
      cause: obj,
    });
  }
}

class TyipcalUserFacingErrorMessages extends Error {
  static GeneralServerError(explanation, ticketNumber) {
    const template = dedentTrim`

        A system error has occurred:

        :+

        Please try again later.

        You can also file a bug report if the problem persists.
        ${escapeForTemplate(process.env.BUG_REPORT_URL)}

        For pressing issues, contact ${escapeForTemplate(process.env.SUPPORT_EMAIL)}

        Ticket #: ${escapeForTemplate(ticketNumber)}
        `;
    return fillTemplate(template, [indent(explanation, 4)]);
  }
}

class TypicalRPCErrors {
  static InvalidAPIInputError(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 400,
      logMessage: `Invalid input to API`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        `Invalid API Request`,
        ticketNumber,
      ),
    });
  }

  static APIRouteNotFoundError(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 404,
      logMessage: `API Route Not Found`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        `The client made a request to a non-existent API route`,
        ticketNumber,
      ),
    });
  }
  static ThirdPartyConnectionError(service, cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 500,
      logMessage: `Failure to connect to third party service: ${service}`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        "The application server is experiencing a network error",
        ticketNumber,
      ),
    });
  }

  static UnknownServerError(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 500,
      logMessage: `Unknown Server Error`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        "Unknown Error",
        ticketNumber,
      ),
    });
  }

  static MissingDataError(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 500,
      logMessage: `Missing Data`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        "Some requested data is missing.",
        ticketNumber,
      ),
    });
  }

  static UnauthorizedError(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 401,
      logMessage: `Unauthorized`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        "You are not authorized to access this resource.",
        ticketNumber,
      ),
    });
  }
}

export { RPCError, TypicalRPCErrors, TyipcalUserFacingErrorMessages };
