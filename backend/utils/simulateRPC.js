const formatError = require("./formatError.js")

class RPCError extends Error {
    constructor(status, message, cause=undefined){
        super(message)
        this.name = "RPCError"
        this.status = status
        this.cause=formatError(cause)
    }
    static is(obj){
        return obj instanceof RPCError
    }
    static isLike(obj){
        return RPCError.is(obj) || (
            typeof obj === "object" &&
             obj.name==="RPCError" &&
              typeof obj.status === "number"
            && typeof obj.message === "string" 
        )
    }
}

module.exports=async function(request,response,callback){
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
            response.status(500).json(new RPCError(500,"Internal Server Error",e))
        }
    }
}