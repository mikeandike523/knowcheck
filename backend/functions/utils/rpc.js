const functions = require("firebase-functions/v2")

const formatError = require("./formatError.js")
const dedentTrim = require("./dedentTrime.js")

class RPCError extends Error {

    static buildMessage({
        status, logMessage, cause=undefined, userFacingMessage=undefined
    }){
        return `
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

}

async function simulateRPC(request,response,callback){
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
            response.status(500).json(new RPCError({
                status:500,
                logMessage:"Internal Server Error",
                cause:e
            }))
        }
    }
}

class TypicalRPCErrors {
    static InvalidAPIInput(input){
        return new RPCError({
            status:400,
            logMessage:`Invalid input to API`,
            userFacingMessage:`
            Invalid input to API, there may be an issue with the network or a form you recently submitted.
            Please try again later.`.trim(),
            cause:input
        })
    }
}

async function createRPCHandler(callback){
    return functions.https.onRequest({cors:true},(request,response)=>{
        simulateRPC(request,response,callback)
    })
}

module.exports.RPCError = RPCError
module.exports.simulateRPC = simulateRPC
module.exports.createRPCHandler = createRPCHandler