import {z} from 'zod'
import { Refiner } from "./types";

export default function isEmail(message?:string){
    const refiner= ((value,ctx)=>{
        const cleaned = value.trim().toLowerCase()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(cleaned)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:message??"Invalid email address."
            })
            return false
        }
        return true
    }) as Refiner<string>
    return refiner
}