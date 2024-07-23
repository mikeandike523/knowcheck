import { z } from "zod";

import {
  ValidatorSchemaUnwrap,
  zodToSimple,
} from "../../../../utils/input-validation";
import nonempty from "../../../../utils/zod-refiners/nonempty";
import { QuizQuestionReponse } from "../quiz";

export const argsSchema = {
  questionId: zodToSimple(
    z.string().superRefine(nonempty(false, "Question ID is required"))
  ),
  answer: zodToSimple(
    z.string().superRefine(nonempty(false, "Answer is required"))
  ),
  instanceId: zodToSimple(
    z.string().superRefine(nonempty(false, "Instance ID is required"))
  )
} as const;

export type TArgs = ValidatorSchemaUnwrap<typeof argsSchema>;

export type TReturn = QuizQuestionReponse
