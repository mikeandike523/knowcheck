import { z } from "zod";

import {
  zodToSimple
} from "../../../../utils/input-validation";
import nonempty from "../../../../utils/zod-refiners/nonempty";

export const argsSchema = {
  instanceId: zodToSimple(
    z.string().superRefine(nonempty(false, "Instance ID is required"))
  )
} as const;

export type TArgs = null

/**
 * Either the question body text, or a number reflecting how many questions are in the subject
 * In the case where there are no more questions left to answer
 * This can be used to construct messages to the end user
 */
export type TReturn = string | number
