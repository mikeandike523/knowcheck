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

export type TArgs = {
  instanceId: string;
}

export type TReturn = string | null
