const formatError = require("./utils/formatError.js")

module.exports=async function(request,response,callback){
    const args = request.body // Auto-parsed
    try {
        let resultOrPromise = callback(args)
        if(resultOrPromise instanceof Promise){
            resultOrPromise = await resultOrPromise
        }
        response.status(200).json(resultOrPromise)
    } catch (e) {
        response.status(500).json(formatError(e))
    }
}