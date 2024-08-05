import { RPCError, TypicalRPCErrors } from "./rpc.js";
import * as logger from "firebase-functions/logger";
import CookieEngine from "./CookieEngine.js";

/**
 * @param {*} route - The requested route / firebase function
 * @param {*} error - 1. An RPCError object
 *
 *                       OR
 *
 *                    2. A (sync) callback that when given a ticket number constructs the error
 *                            (which in some cases may involve
 *                            simply passing a reference to an existing error object)
 *
 * @returns {Promise<RPCError>} A reference to the original error (potentially generated from a callback)
 */
async function fileError(route, error) {
  const TICKET_NUMBER_LENGTH = 15;

  const generateTicketNumber = () => {
    let ticketNumber = "";
    const digits = "0123456789";
    for (let i = 0; i < TICKET_NUMBER_LENGTH; i++) {
      ticketNumber += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return ticketNumber;
  };

  const ticketNumber = generateTicketNumber();

  const constructError =
    typeof error === "function" ? error(ticketNumber) : error;

  const rpcError = RPCError.wrap(constructError);

  const errorData = rpcError.toJSON();

  await logger.write({ severity: "ERROR", ...errorData, route, ticketNumber });

  return rpcError;
}

/**
 * 
 * @param {import('express').Request} request 
 * @param {import('express').Response} response 
 * @param {(args: any, cookieEngine: any)=>any} callback 
 * @param {*} routeName 
 */
async function simulateRPC(request, response, callback, routeName = "") {
  const args = request.body;

  try {
    let resultOrPromise = callback(args, new CookieEngine(request, response));
    if (resultOrPromise instanceof Promise) {
      resultOrPromise = await resultOrPromise;
    }
    response.status(200).json(resultOrPromise);
  } catch (e) {
    console.error("Server Error (rpc server try catch):")
    console.error(e)
    if (RPCError.isLike(e)) {
      response.status(e.status).json(RPCError.wrap(e).toJSON());
    } else {
      response.status(500).json(
        await fileError(
          routeName,
          /**
           *
           * @param {string|undefined} ticketNumber
           * @returns
           */
          (ticketNumber) => {
            return TypicalRPCErrors.UnknownServerError(e, ticketNumber);
          }
        )
      );
    }
  }
}

export { simulateRPC, fileError };
