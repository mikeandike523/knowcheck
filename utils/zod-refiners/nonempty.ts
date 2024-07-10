import {z} from 'zod'
import { Refiner } from "./types";

export default function nonempty(allowWhitespace:boolean=true,message?:string){
    const refiner= ((value,ctx)=>{
        if(!allowWhitespace){
            value=value.trim()
        }
        if(value===""){
            ctx.addIssue({
                code:z.ZodIssueCode.custom,
                message:message??(allowWhitespace?"String must not be empty.":"String may not be empty or entirely whitespace.")
            })
            return false
        }
        return true
    }) as Refiner<string>
    return refiner
}