import { z } from "zod";

import {
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

export type TArgs = {
  questionId: string;
  answer: string;
  instanceId: string;
}

export type TReturn = Pick<QuizQuestionReponse, "gptScore" | "gptExplanation" | "supportingInfo">
