import { z } from "zod";

import {
  Validator,
  zodToSimple
} from "../../../utils/input-validation";
import isOneOfStrings from "../../../utils/zod-refiners/isOneOfStrings";
import nonempty from "../../../utils/zod-refiners/nonempty";
import { QuizEndpointArg, QuizEndpointReturn } from "../../api-types/handlers/quiz";

export const actions = ["loadNextQuestion", "submitAnswer"] as const;

export type Action = (typeof actions)[number];

export const schema = {
  instanceId: zodToSimple(
    z.string().superRefine(nonempty(false, "instance ID is required."))
  ),
  action: zodToSimple<Action>(z.any().superRefine(isOneOfStrings<Action>(actions))),
  payload: ((value: unknown)=>{
    if(typeof value === "object" && value!== null){
      return {
        valid: true,
        data: value as QuizEndpointArg,
      }
    }
    return {
      valid: false,
      message: "Payload must be an object or null"
    }
  } ) as Validator<unknown,QuizEndpointArg>,
};

export type TSchema = {
  instanceId: string;
  action: Action;
  payload: QuizEndpointArg
}

export type TReturn = QuizEndpointReturn
