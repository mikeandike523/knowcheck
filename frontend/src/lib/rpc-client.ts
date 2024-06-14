

import {SmartFetch} from '@/utils/SmartFetch';
import {RPCError } from '@/utils/rpc';

export type SerializablePrimitive = string | number | boolean | null
export type SerializableObject = {
    [key: string|number]: SerializablePrimitive | SerializableObject
} | SerializablePrimitive[] | SerializableObject[]



export function useRPCRoute<TArgs extends SerializableObject, TReturn extends SerializableObject>(route: string) {
    const sf = new SmartFetch(process.env.RPC_URL!).route(route);
    return async function route(args: TArgs): Promise<TReturn> {
        try {
            return await sf.post(args);
        } catch (e) {
            if (RPCError.isLike(e)) {
                throw RPCError.wrap(e)
            } else {
                throw new RPCError({
                    status: 400,
                    userFacingMessage: 'Something went wrong in your browser.',
                    logMessage: 'Client error',
                    cause: e,
                });
            }
        }
    }
}