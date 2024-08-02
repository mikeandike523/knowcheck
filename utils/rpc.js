import * as fe from "./formatError.js";
const formatError = fe.default;
import * as dt from "./dedentTrim.js";
const dedentTrim = dt.default;

import * as idnt from "./indent.js";
const indent = idnt.default;
import * as st from "./string-templating.js";
const fillTemplate = st.fillTemplate;
const escapeForTemplate = st.escapeForTemplate;

/**
 * @typedef {object} RPCErrorParams
 *
 * @property {number} status - The HTTP status code.
 * @property {string} logMessage - A brief description of the error.
 * @property {any|undefined} [cause=undefined] - The original error that caused this error.
 * @property {string|undefined} [userFacingMessage=undefined] - A more user-friendly message for the client
 */

/**
 * @typedef {object} RPCErrorData
 *
 * @property {number} status
 * @property {string} logMessage
 * @property {string|undefined} [userFacingMessage=undefined]
 * @property {any|undefined} [cause=undefined]
 * @property {string} message
 * @property {"RPCError"} name
 */

class RPCError extends Error {
  /**
   *
   * @param {RPCErrorParams} params
   */
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

typeof Cause: ${typeof cause}

    `;
  }

  /**
   *
   * @param {RPCErrorParams} params
   */
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
      })
    );
    this.logMessage = logMessage;
    this.name = "RPCError";
    this.status = status;
    this.cause = formatError(cause);
    this.userFacingMessage = userFacingMessage;
  }

  /**
   * @returns {boolean}
   */
  isUserFacing() {
    return typeof this.userFacingMessage === "string";
  }

  /**
   *
   * @returns {string}
   */
  getLogMessage() {
    return this.logMessage;
  }

  /**
   *
   * @returns {string|undefined}
   */
  getUserFacingMessage() {
    return this.userFacingMessage;
  }

  /**
   * @returns {RPCErrorData}
   */
  toJSON() {
    return {
      name: "RPCError",
      message: this.message,
      logMessage: this.logMessage,
      status: this.status,
      cause: this.cause,
      userFacingMessage: this.userFacingMessage,
    };
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    return this.message;
  }

  /**
   * @param {any} obj
   * @returns
   */
  static is(obj) {
    return obj instanceof RPCError;
  }

  /**
   * @param {any} obj
   * @returns {obj is RPCErrorData}
   */
  static isLike(obj) {
    return (
      RPCError.is(obj) || (typeof obj === "object" && obj.name === "RPCError")
    );
  }
  /**
   *
   * @param {any} obj
   * @param {number} [status=500]
   * @returns
   */
  static wrap(obj, status = 500) {
    if (RPCError.isLike(obj)) {
      return new RPCError({
        status: obj.status ?? status,
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
  /**
   *
   * @param {string} explanation
   * @param {string|undefined} [ticketNumber=undefined]
   * @returns
   */
  static GeneralServerError(explanation, ticketNumber) {
    const template = dedentTrim`

        A system error has occurred:

        :+

        Please try again later.

        You can also file a bug report if the problem persists.
        ${escapeForTemplate(process.env.BUG_REPORT_UR ?? "")}

        For pressing issues, contact ${escapeForTemplate(process.env.SUPPORT_EMAIL ?? "")}

        Ticket #: ${escapeForTemplate(ticketNumber ?? "")}
        `;
    return fillTemplate(template, [indent(explanation, 4)]);
  }
}

class TypicalRPCErrors {
  /**
   *
   * @param {any} cause
   * @param {string} ticketNumber
   * @returns
   */
  static GenerativeAIFailure(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 500,
      logMessage: `Generative AI Failure`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        `Error Generating AI Response`,
        ticketNumber
      ),
    });
  }

  /**
   * @param {any} cause
   * @param {string} ticketNumber
   * @returns
   */
  static GeneralServerError(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 500,
      logMessage: `General Server Error`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        `General Server Error`,
        ticketNumber
      ),
    });
  }
  /**
   * @param {any} cause
   * @param {string|undefined} [ticketNumber=undefined]
   * @returns
   */
  static InvalidAPIInputError(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 400,
      logMessage: `Invalid input to API`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        `Invalid API Request`,
        ticketNumber
      ),
    });
  }

  /**
   * @param {any} cause
   * @param {string|undefined} [ticketNumber=undefined]
   * @returns
   */
  static APIRouteNotFoundError(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 404,
      logMessage: `API Route Not Found`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        `The client made a request to a non-existent API route`,
        ticketNumber
      ),
    });
  }

  /**
   * @param {string} service
   * @param {any} cause
   * @param {string|undefined} [ticketNumber=undefined]
   * @returns
   */
  static ThirdPartyConnectionError(service, cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 500,
      logMessage: `Failure to connect to third party service: ${service}`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        "The application server is experiencing a network error",
        ticketNumber
      ),
    });
  }


  /**
   * @param {string} service
   * @param {any} cause
   * @param {string|undefined} [ticketNumber=undefined]
   * @returns
   */
  static ThirdPartyInvalidResponse(service,cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 500,
      logMessage: `Recieved a bad or invalid response from: ${service}`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        "Data from an external service was invalid.",
        ticketNumber
      ),
    });
  }

  /**
   * @param {any} cause
   * @param {string|undefined} [ticketNumber=undefined]
   * @returns
   */
  static UnknownServerError(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 500,
      logMessage: `Unknown Server Error`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        "Unknown Error",
        ticketNumber
      ),
    });
  }

  /**
   * @param {any} cause
   * @param {string|undefined} [ticketNumber=undefined]
   * @returns
   */
  static MissingDataError(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 500,
      logMessage: `Missing Data`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        "Some requested data is missing.",
        ticketNumber
      ),
    });
  }

  /**
   * @param {any} cause
   * @param {string|undefined} [ticketNumber=undefined]
   * @returns
   */
  static UnauthorizedError(cause, ticketNumber) {
    return new RPCError({
      cause,
      status: 401,
      logMessage: `Unauthorized`,
      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(
        "You are not authorized to access this resource.",
        ticketNumber
      ),
    });
  }
}

export { RPCError, TypicalRPCErrors, TyipcalUserFacingErrorMessages };
