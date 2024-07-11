import { z } from "zod";
import nonempty from "../../../utils/zod-refiners/nonempty";

export type TSchema = {
  subjectId: string;
  instanceId: string;
  accessCode: string;
};

const schema = {
  subjectId: z
    .string()
    .superRefine<string>(nonempty(false, "Subject ID is required.")),
  instanceId: z
    .string()
    .superRefine<string>(nonempty(false, "Instance ID is required.")),
  accessCode: z
    .string()
    .superRefine<string>(nonempty(false, "Access code is required.")),
};

export default schema;
