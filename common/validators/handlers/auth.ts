import { z } from "zod";
import nonempty from "../../../utils/zod-refiners/nonempty";
import {zodToSimple,ValidatorSchemaUnwrap} from '../../../utils/input-validation'

export const schema = {
  subjectId: zodToSimple(z
    .string()
    .superRefine<string>(nonempty(false, "Subject ID is required."))),
  instanceId: zodToSimple(z
    .string()
    .superRefine<string>(nonempty(false, "Instance ID is required."))),
  accessCode: zodToSimple(z
    .string()
    .superRefine<string>(nonempty(false, "Access code is required."))),
};

export type TSchema = ValidatorSchemaUnwrap<typeof schema>
