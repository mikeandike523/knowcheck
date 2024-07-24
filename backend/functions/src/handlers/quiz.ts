import { Firestore } from "firebase-admin/firestore";

import * as typesQuizActionsLoadNextQuestion from "../../common/api-types/handlers/quizActions/loadNextQuestion";
import * as typesQuizActionsSubmitAnswer from "../../common/api-types/handlers/quizActions/submitAnswer";
import {
  schema,
  TReturn,
  TSchema,
} from "../../common/validators/handlers/quiz";
import CookieEngine from "../../utils/CookieEngine";
import { parseObjectSchema } from "../../utils/input-validation";
import createHandlerLoadNextQuestion from "./quizActions/loadNextQuestion";
import createHandlerSubmitAnswer from "./quizActions/submitAnswer";

export default function createHandlderQuiz(db: Firestore) {
  const loadNextQuestionHandler = createHandlerLoadNextQuestion(db);
  const submitAnswerHandler = createHandlerSubmitAnswer(db);
  return async function quiz(
    args: TSchema,
    cookieEngine: CookieEngine
  ): Promise<TReturn> {
    const parsedArgs = parseObjectSchema<TSchema>(args, schema);

    switch (parsedArgs.action) {
      case "loadNextQuestion":
        return await loadNextQuestionHandler(
          parseObjectSchema<typesQuizActionsLoadNextQuestion.TArgs>(
            parsedArgs.payload,
            typesQuizActionsLoadNextQuestion.argsSchema
          ),
          cookieEngine
        );
      case "submitAnswer":
        return await submitAnswerHandler(
          parseObjectSchema<typesQuizActionsSubmitAnswer.TArgs>(
            parsedArgs.payload,
            typesQuizActionsSubmitAnswer.argsSchema
          ),
          cookieEngine
        );
    }
  };
}
