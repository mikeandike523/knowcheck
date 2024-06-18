// index.d.ts

import { RPCError } from './rpc.js';
import * as functions from "firebase-functions/v2";

export type ErrorCallback = (ticketNumber: string) => RPCError;

/**
 * @param route - The requested route / firebase function
 * @param error - 1. An RPCError object
 *                2. A (sync) callback that when given a ticket number constructs the error
 *                   (which in some cases may involve simply passing a reference to an existing error object)
 * @returns A reference to the original error (potentially generated from a callback)
 */
declare function fileError(route: any, error: RPCError | ErrorCallback): Promise<RPCError>;
/**
 * @param request - The HTTP request object
 * @param response - The HTTP response object
 * @param callback - The callback function to handle the RPC
 * @param routeName - The name of the route (optional)
 */
declare function simulateRPC(request: functions.https.Request, response: functions.Response<any>, callback: (args: any) => any, routeName?: string): Promise<void>;

/**
 * @param callback - The callback function to handle the RPC
 * @param routeName - The name of the route (optional)
 * @returns A Firebase HTTPS function to handle the RPC
 */
declare function createRPCHandler(callback: (args: any) => any, routeName?: string): functions.https.OnRequestHandler;

export { fileError, simulateRPC, createRPCHandler };