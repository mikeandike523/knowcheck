function formatError(e){
    const visited = new Set()
    const recursion=(e1)=>{
        if(typeof e1 === "undefined"){
            return null
        }
        if(e1===null){
            return null
        }
        if([
            "string",
            "number",
            "boolean"
        ].includes(typeof e1)){
            return e1
        }
        if(typeof e1 === "object"){
            if(visited.has(e1)){
                return null
            }
            visited.add(e1)
            if(Array.isArray(e1)){
                return e1.map((item)=>{
                    return recursion(item)
                })
            }else{
                const result = {}
                const keys = Object.getOwnPropertyNames(e1)
                keys.forEach((keyName)=>{
                    result[keyName]=recursion(e1[keyName])
                })
                return result
            }
        }
        return e1.toString()
    }
    return recursion(e)
}