import * as functions from "firebase-functions/v2";

import { type Response } from 'firebase-functions/v1';
import { type Request } from 'firebase-functions/v2/https';
import CookieEngine from "../utils/CookieEngine.js";
import { simulateRPC } from '../utils/rpc-server.js';

/**
 * Given an RPC-style handler, wrap it with the necessary code
 * to define a firebase function
 */
export default function createRoute<TIn, TOut>(
    routeName: string,
    handler: (args: TIn, cookieEngine: CookieEngine) => TOut | Promise<TOut>
) {
    return functions.https.onRequest({ cors: true }, async (request: Request, response: Response) => {
        response.setHeader('Cache-Control', 'private');
        simulateRPC(request, response, handler, routeName);
    });
}