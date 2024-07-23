import { z } from "zod";

import {
  ValidatorSchemaUnwrap,
  zodToSimple,
} from "../../../../utils/input-validation";
import nonempty from "../../../../utils/zod-refiners/nonempty";

export const argsSchema = {
  instanceId: zodToSimple(
    z.string().superRefine(nonempty(false, "Instance ID is required"))
  )
} as const;

export type TArgs = ValidatorSchemaUnwrap<typeof argsSchema>;

export type TReturn = {
    questionText: string;
}
