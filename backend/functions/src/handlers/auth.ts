import { Firestore } from "firebase-admin/firestore"
import CookieEngine from "../../utils/CookieEngine.js"
import { verify } from "argon2"



import { TypicalRPCErrors } from "../../utils/rpc.js"
import { TArgs,TReturn } from "../../common/api-types/handlers/auth"
export default function createHandlerAuth(db:Firestore){
    return async function auth({
        subjectId,instanceId, accessCode
    }: TArgs,cookieEngine:CookieEngine): Promise<TReturn> {
        // Steps
        // 1. Check subjectId against document ids in the subjects collection to ensure it exists
        // 2. Check that the instanceId exists in the "registrations" collection
        // 3. Use argon2 to verify the accessCode hash from the registration document
        // 4. If verified
        // 5. Begin the process of generating an access code and corresponding jwt token
              // Step 1. generate a jwt given the claims {subjectId, instanceId, timestamp (epoch millis), expires: (epoch millis), maxAge: (number of millis) }
              // Will set the expiry to 30 minutes, and will attempt to refresh token every 15 minutes, or on a failed request due to expiry
              //         sign it with process.env.JWT_SECRET
              // Add it to the "access_tokens" collection as a new document with a new random/unique id
              // the format is 
              // {
              // claims: copy of all the jwt claims
              // revoked: false,
              // }
        // 6. Set the cookie using the cookieEngine class with appropriate settings
        // This includes mataching expires and maxAge from the claims in the format used for cookies whatever that is


        // Implementation

        // Setp 1
        const subjectConfig =

        return null
    }
    
}