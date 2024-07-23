import { z } from "zod";

import {
  zodToSimple,
  ValidatorSchemaUnwrap,
} from "../../../utils/input-validation";
import nonempty from "../../../utils/zod-refiners/nonempty";
import isOneOfStrings from "../../../utils/zod-refiners/isOneOfStrings";

export const actions = ["loadNextQuestion", "submitAnswer"] as const;

export type Action = (typeof actions)[number];

export const schema = {
  instanceId: zodToSimple(
    z.string().superRefine(nonempty(false, "instance ID is required."))
  ),
  action: zodToSimple(z.any().superRefine(isOneOfStrings<Action>(actions))),
  payload: zodToSimple(z.object({}).passthrough().nullable()),
};

export type TSchema = ValidatorSchemaUnwrap<typeof schema>;
