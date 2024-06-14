const {RPCError} = require("./RPCError");
const functions = require("firebase-functions/v2");
const {log} = require("firebase-functions/v2/logger")

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
    // Step 1: Generate a unique ticket number (15 digits numeric string)
    const generateTicketNumber = () => {
      let ticketNumber = "";
      const digits = "0123456789";
      for (let i = 0; i < TICKET_NUMBER_LENGTH; i++) {
        ticketNumber += digits.charAt(Math.floor(Math.random() * digits.length));
      }
      return ticketNumber;
    };
  
    const ticketNumber = generateTicketNumber();
  
    // Step 2: Construct the error if it's a function, otherwise assume it's an RPCError
    const constructError =
      typeof error === "function" ? error(ticketNumber) : error;
  
    // Step 3: Ensure the error is wrapped in an RPCError
    const rpcError = RPCError.wrap(constructError);
  
    // Step 4: Convert the error to JSON
    const errorData = rpcError.toJSON();
  
    // Step 5: Add the route and ticket number to the error data
    errorData.route = route;
    errorData.ticketNumber = ticketNumber;
  
    // Step 6: Log the error to Firebase Logging
    const metadata = {
      resource: { type: "global" },
    };
  
    const entry = log.entry(metadata, errorData);
    await log.write(entry);
  
    // Step 7: Return the original error for "rethrow"
    return rpcError;
  }

async function simulateRPC(request, response, callback, routeName = "") {
    const args = request.body; // Auto-parsed
    try {
      let resultOrPromise = callback(args);
      if (resultOrPromise instanceof Promise) {
        resultOrPromise = await resultOrPromise;
      }
      response.status(200).json(resultOrPromise);
    } catch (e) {
      if (RPCError.isLike(e)) {
        response.status(e.status).json(e);
      } else {
        response.status(500).json(
          await fileError(db, routeName, (ticketNumber) => {
            return TypicalRPCErrors.GeneralServerError(e, ticketNumber);
          }),
        );
      }
    }
  }
  async function createRPCHandler(callback, routeName = "") {
    return functions.https.onRequest({ cors: true }, (request, response) => {
      simulateRPC(request, response, callback, routeName);
    });
  }
  
  

module.exports.simulateRPC = simulateRPC;
module.exports.createRPCHandler = createRPCHandler;
module.exports.fileError = fileError;
  