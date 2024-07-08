import* as functions from "firebase-functions/v2"

import {type Request} from 'firebase-functions/v2/https'
import { type Response } from 'firebase-functions/v1';
// Dynamic import wrappers commonly used throughout this project
// provided primarily to facilitiy ease CommonJS compatibility
// which is required for firebase functions at this time
import { simulateRPC }  from '../utils/rpc-server.js';

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
export default   function createRoute<TIn, TOut>(
    routeName: string,
    handler: (args: TIn) => TOut | Promise<TOut>
){
    return functions.https.onRequest(async (request:Request, response:Response) => {
        simulateRPC(request, response, handler, routeName);
      });
}