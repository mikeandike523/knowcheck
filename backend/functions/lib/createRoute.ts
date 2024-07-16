import * as functions from "firebase-functions/v2"

import { type Request } from 'firebase-functions/v2/https'
import { type Response } from 'firebase-functions/v1';
// Dynamic import wrappers commonly used throughout this project
// provided primarily to facilitiy ease CommonJS compatibility
// which is required for firebase functions at this time
import { simulateRPC } from '../utils/rpc-server.js';
import CookieEngine from "../utils/CookieEngine.js";
import ColorDebug from "../utils/ColorDebug.js"

/**
 * Given an RPC-style handler, wrap it with the necessary code
 * to define a firebase function
 * @param routeName 
 * @param handler 
 * @returns 
 * 
 * @remarks
 * Unfortunately, due to firebase functions needing CommonJS, it is necessary
 * to dynamically import code each time the function is run
 * 
 * @todo Look into ways to cache dynamic imports in firebase functions
 * 
 */
export default function createRoute<TIn, TOut>(
    routeName: string,
    handler: (args: TIn, cookieEngine: CookieEngine) => TOut | Promise<TOut>
) {
    return functions.https.onRequest({ cors: true }, async (request: Request, response: Response) => {
        // console.log(request.method)
        // if (request.method === "OPTIONS") {

        //     console.log("got preflight request")

        //     ColorDebug.ansi().info("Recieved preflight request",{
        //         textColor: "magenta"
        //     })

        //     // Add the appropriate headers
        //     response.set('Access-Control-Allow-Origin', '*'); // You can restrict this to specific origins if needed
        //     response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        //     response.set('Access-Control-Allow-Credentials', 'true'); // Include this if credentials are required

        //     // Respond with 204 (No Content) for preflight requests
        //     response.status(204).send('');
        //     return
        // }
        response.setHeader('Cache-Control', 'private');
        simulateRPC(request, response, handler, routeName);
    });
}