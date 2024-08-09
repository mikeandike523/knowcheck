import { z } from "zod"

import {
    zodToSimple
} from "../../../utils/input-validation";
import nonempty from "../../../utils/zod-refiners/nonempty";

  
export const schema = {
      instanceId: zodToSimple(
    z.string().superRefine(nonempty(false, "Instance ID is required."))
  ),
}

export type TSchema = {
      instanceId: string;
}