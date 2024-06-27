// index.d.ts

import { RPCError } from "./rpc.js";
import * as functions from "firebase-functions/v2";

export type ErrorCallback = (ticketNumber: string) => RPCError;

/**
 * @param route - The requested route / firebase function
 * @param error - 1. An RPCError object
 *                2. A (sync) callback that when given a ticket number constructs the error
 *                   (which in some cases may involve simply passing a reference to an existing error object)
 * @returns A reference to the original error (potentially generated from a callback)
 */
declare function fileError(
  route: any,
  error: RPCError | ErrorCallback,
): Promise<RPCError>;
/**

/**
 * @param callback - The callback function to handle the RPC
 * @param routeName - The name of the route (optional)
 * @returns A Firebase HTTPS function to handle the RPC
 */
declare function createRPCHandler<TArgs, TReturn>(
  callback: (args: TArgs) => any,
  routeName?: string,
): functions.https.HttpsFunction;

export { fileError, createRPCHandler };
