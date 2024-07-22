import { z } from "zod";

import {
  zodToSimple,
  ValidatorSchemaUnwrap,
} from "../../../utils/input-validation";
import isOneOfStrings from "../../../utils/zod-refiners/isOneOfStrings";
import nonempty from "../../../utils/zod-refiners/nonempty";

export const actions = ["refresh", "check"] as const;

export type Action = (typeof actions)[number];

export const schema = {
  action: zodToSimple<Action>(
    z
      .any()
      .superRefine<Action>(
        isOneOfStrings<Action>(
          actions,
          (action) =>
            `Invalid action \"${action}\", must be one of: ${actions.join(", ")}.`
        )
      )
  ),
  instanceId: zodToSimple(
    z.string().superRefine(nonempty(false, "Instance ID is required."))
  ),
};

export type TSchema = ValidatorSchemaUnwrap<typeof schema>;
