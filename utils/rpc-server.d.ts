export function simulateRPC(request: any, response: any, callback: any, routeName?: string): Promise<void>;
/**
 * @param {*} route - The requested route / firebase function
 * @param {*} error - 1. An RPCError object
 *
 *                       OR
 *
 *                    2. A (sync) callback that when given a ticket number constructs the error
 *                            (which in some cases may involve
 *                            simply passing a reference to an existing error object)
 *
 * @returns {Promise<RPCError>} A reference to the original error (potentially generated from a callback)
 */
export function fileError(route: any, error: any): Promise<RPCError>;
import { RPCError } from "./rpc.js";
