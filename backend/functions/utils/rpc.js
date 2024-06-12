const functions = require("firebase-functions/v2")

const formatError = require("./formatError.js")
const dedentTrim = require("./dedentTrime.js")
const indent = require("./indent.js")
const {fillTemplate, escapeForTemplate} = require("./string-templating.js")

class RPCError extends Error {

    static buildMessage({
        status, logMessage, cause=undefined, userFacingMessage=undefined
    }){
        return dedentTrim`
RPCError:
       
Status: ${status}

Log Message:
${logMessage}

User Facing Message:
${userFacingMessage}

Cause:
${typeof cause === 'undefined'? "undefined" : JSON.stringify(formatError(cause),null,2)}

    `
    }
    
    constructor({
        status, logMessage, cause=undefined, userFacingMessage=undefined
    }){
        super(RPCError.buildMessage({
            status,
            logMessage,
            cause,
            userFacingMessage
        }))
        this.logMessage = logMessage
        this.name = "RPCError"
        this.status = status
        this.cause=formatError(cause)
        this.userFacingMessage = userFacingMessage
    }

    isUserFacing(){
        return typeof this.userFacingMessage === "string"
    }

    getLogMessage(){
        return this.logMessage
    }

    getUserFacingMessage(){
        return this.userFacingMessage
    }

    toJSON(){
        return {
            message:this.message,
            logMessage:this.logMessage,
            status:this.status,
            cause:this.cause,
            userFacingMessage:this.userFacingMessage,
            isUserFacing:this.isUserFacing()
        }
    }

    toString(){
        return this.message
    }


    static is(obj){
        return obj instanceof RPCError
    }
    static isLike(obj){
        // Oversimplified but will only improve it if needed
        return RPCError.is(obj) || (
            typeof obj === "object" &&
             obj.name==="RPCError"
        )
    }
    static wrap(obj, status=5000){
        if(RPCError.isLike(obj)){
            return obj
        }
        return new RPCError({
            status,
            logMessage:"Internal Server Error",
            cause:obj
        })
    }

}



class TyipcalUserFacingErrorMessages extends Error {
    static GeneralServerError(explanation,ticketNumber){
        const template =   dedentTrim`

        A system error has occurred:

        :+

        Please try again later.

        You can also file a bug report if the problem persists.
        ${escapeForTemplate(process.env.BUG_REPORT_URL)}

        For pressing issues, contact ${escapeForTemplate(process.env.SUPPORT_EMAIL)}

        Ticket #: ${escapeForTemplate(ticketNumber)}
        `
        return fillTemplate(template,[indent(explanation,4)])
    }
}

class TypicalRPCErrors {
    static InvalidAPIInputError(cause,ticketNumber){
        return new RPCError({
            cause,
            status:400,
            logMessage:`Invalid input to API`,
            userFacingMessage:TyipcalUserFacingErrorMessages.GeneralServerError(`Invalid API Request`,ticketNumber),
        })
    }

    static APIRouteNotFoundError(cause,ticketNumber){
        return new RPCError({
            cause,
            status:404,
            logMessage:`API Route Not Found`,
            userFacingMessage:TyipcalUserFacingErrorMessages.GeneralServerError(`The client made a request to a non-existent API route`,ticketNumber),
        })
    }
    static ThirdPartyConnectionError(service,cause,ticketNumber){
        return new RPCError({
            cause,
            status:500,
            logMessage:`Failure to connect to third party service: ${service}`,
            userFacingMessage:TyipcalUserFacingErrorMessages.GeneralServerError(
                "The application server is experiencing a network error",
                ticketNumber
            )
        })
    }

    static UnknownServerError(cause,ticketNumber){
        return new RPCError({
            cause,
            status:500,
            logMessage:`Unknown Server Error`,
            userFacingMessage:TyipcalUserFacingErrorMessages.GeneralServerError("Unknown Error",ticketNumber),
        })
    }

    static MissingDataError(cause,ticketNumber){
        return new RPCError({
            cause,
            status:500,
            logMessage:`Missing Data`,
            userFacingMessage:TyipcalUserFacingErrorMessages.GeneralServerError("Some requested data is missing.",ticketNumber)
        })
    }
}

async function simulateRPC(request,response,callback,routeName=""){
    const args = request.body // Auto-parsed
    try {
        let resultOrPromise = callback(args)
        if(resultOrPromise instanceof Promise){
            resultOrPromise = await resultOrPromise
        }
        response.status(200).json(resultOrPromise)
    } catch (e) {
        if(RPCError.isLike(e)){
            response.status(e.status).json(e)
        }else{
            response.status(500).json(await fileError(db,routeName, (ticketNumber)=>{
                return TypicalRPCErrors.GeneralServerError(e,ticketNumber)
            }))
        }
    }
}
async function createRPCHandler(callback,routeName=""){
    return functions.https.onRequest({cors:true},(request,response)=>{
        simulateRPC(request,response,callback,routeName)
    })
}

// Old roll-your-own version
// /**
//  * 
//  * @param {*} db - A Firstore DB reference
//  * @param {*} route - The requested route / firebase function
//  * @param {*} error - 1. An RPCError object
//  *                                           
//  *                       OR
//  * 
//  *                    2. A (sync) callback that when given a ticket number constructs the error
//  *                            (which in some cases may involve
//  *                            simply passing a refrence to an existing error object) 
//  * 
//  * @returns {Promise<RPCError>} A reference to the original error (potentially generated from a callback)
//  */
// async function fileError(db, route, error) {
//     // Step 1: Generate a unique ticket number (15 digits numeric string)
//     const generateTicketNumber = () => {
//         let ticketNumber = '';
//         for (let i = 0; i < 15; i++) {
//             ticketNumber += Math.floor(Math.random() * 10).toString();
//         }
//         return ticketNumber;
//     };

//     const ticketNumber = generateTicketNumber();

//     // Step 2: Construct the error if it's a function, otherwise assume it's an RPCError
//     const constructError = typeof error === 'function' ? error(ticketNumber) : error;

//     // Step 3: Ensure the error is wrapped in an RPCError
//     const rpcError = RPCError.wrap(constructError);

//     // Step 4: Convert the error to JSON
//     const errorData = rpcError.toJSON();

//     // Step 5: Add the route and ticket number to the error data
//     errorData.route = route;
//     errorData.ticketNumber = ticketNumber;

//     // Step 6: Add the error document to the errorTickets collection
//     const errorCollection = db.collection('errorTickets');
//     await errorCollection.doc(ticketNumber).set(errorData);

//     // Step 7: Return the original error for "rethrow"
//     // I.e. "fileError" is kinda like middleware
//     return rpcError
// }

// Better version using firebase logging service

/**
 * 
 * @param {*} db - A Firestore DB reference
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
async function fileError(db, route, error) {
    // Step 1: Generate a unique ticket number (15 digits numeric string)
    const generateTicketNumber = () => {
        let ticketNumber = '';
        const digits = '0123456789';
        for (let i = 0; i < TICKET_NUMBER_LENGTH; i++) {
            ticketNumber += digits.charAt(Math.floor(Math.random() * digits.length));
        }
        return ticketNumber;
    };

    const ticketNumber = generateTicketNumber();

    // Step 2: Construct the error if it's a function, otherwise assume it's an RPCError
    const constructError = typeof error === 'function' ? error(ticketNumber) : error;

    // Step 3: Ensure the error is wrapped in an RPCError
    const rpcError = RPCError.wrap(constructError);

    // Step 4: Convert the error to JSON
    const errorData = rpcError.toJSON();

    // Step 5: Add the route and ticket number to the error data
    errorData.route = route;
    errorData.ticketNumber = ticketNumber;

    // Step 6: Log the error to Firebase Logging
    const metadata = {
        resource: { type: 'global' },
    };

    const entry = log.entry(metadata, errorData);
    await log.write(entry);

    // Step 7: Return the original error for "rethrow"
    return rpcError;
}


module.exports.RPCError = RPCError
module.exports.simulateRPC = simulateRPC
module.exports.createRPCHandler = createRPCHandler
module.exports.TyipcalUserFacingErrorMessages = TyipcalUserFacingErrorMessages
module.exports.TypicalRPCErrors = TypicalRPCErrors
module.exports.fileError = fileError