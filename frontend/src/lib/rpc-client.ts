import { useEffect } from "react";

import * as sf from "@/utils/SmartFetch";
import * as rpc from "@/utils/rpc";
import appConfig from "@/appConfig";
import { DependencyList } from "react";
import { useLoadingTask } from "./loading";

const RPCError = rpc.RPCError;
const SmartFetch = sf.SmartFetch;
const FetchError = sf.FetchError;

/**
 * The list of JSON compatible JS primitive types
 */
export type SerializablePrimitive = string | number | boolean | null;

/**
 * An object or array, that may be arbitrarily nested, and is fully JSON serializable
 */
export type SerializableObject =
  | SerializablePrimitive
  | {
      [key: string | number]: SerializablePrimitive | SerializableObject;
    }
  | SerializablePrimitive[]
  | SerializableObject[];

/**
 *
 * Creates a function that can be used to call a particular RPC route (firebase function)
 *
 * @param route - The route name (firebase function)
 * @returns
 */
export function useRPCRoute<
  TArgs extends SerializableObject,
  TReturn extends SerializableObject,
>(route: string) {
  const sf = new SmartFetch(appConfig().RPC_URL).route(route);
  return async function route(args: TArgs): Promise<TReturn> {
    try {
      return await sf.post(args);
    } catch (e) {
      if (e instanceof FetchError) {
        if(e.data){
          if(RPCError.isLike(e.data)){
            throw RPCError.wrap(e.data,e.statusCode);
          }else{
            throw new RPCError({
              status: 400,
              userFacingMessage: "Something went wrong in your browser.",
              logMessage: e.text,
              cause: e,
            });
          }
        }else{
          throw new RPCError({
            status: e.statusCode,
            userFacingMessage: "Something went wrong in your browser.",
            logMessage: e.text,
            cause: e
          });
        }
      } 
      else {
        throw new RPCError({
          status: 400,
          userFacingMessage: "Something went wrong in your browser.",
          logMessage: "Client error",
          cause: e
        });
      }
    }
  };
}

/**
 *
 * @param route - The name of the RPC route (firebase function)
 * @param args - The arguments to pass to the RPC route (JSON primitive, object, or array)
 * @param additionalDeps - Any additional dependencies,
 *                         for instance, there may be a case where
 *                         there is a time-bound operation where
 *                         `args` does not change value but the
 *                         fetch must be repeated
 * @returns
 */
export function useAPIData<
  TArgs extends SerializableObject,
  TReturn extends SerializableObject,
>(route: string, args: TArgs, additionalDeps: DependencyList = []) {
  const task = useLoadingTask<TReturn>();
  const rpcRoute = useRPCRoute<TArgs, TReturn>(route);
  async function fetchData() {
    task.setLoading();
    rpcRoute(args)
      .then((data) => {
        task.setSuccess(data);
      })
      .catch((e) => {
        task.setError(e);
      });
  }
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(args), ...additionalDeps]);
  return {
    task,
    fetchData,
  };
}
