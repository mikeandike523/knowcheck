import { Firestore } from "firebase-admin/firestore";

import { QuizQuestionReponse } from "../../common/api-types/handlers/quiz";
import {
  schema,
  TReturn,
  TSchema,
} from "../../common/validators/handlers/quiz";
import CookieEngine from "../../utils/CookieEngine";
import dedentTrim from "../../utils/dedentTrim";
import { parseObjectSchema } from "../../utils/input-validation";
import { TypicalRPCErrors } from "../../utils/rpc";
import { fileError } from "../../utils/rpc-server";
import createHandlerLoadNextQuestion from "./quizActions/loadNextQuestion";
import createHandlerSubmitAnswer from "./quizActions/submitAnswer";
import CollectionTypeRegistrations from "../collection-types/registrations";
import { DocumentResult } from "../../lib/firestore";
import * as typesQuizActionsLoadNextQuestion from "../../common/api-types/handlers/quizActions/loadNextQuestion";
import * as typesQuizActionsSubmitAnswer from "../../common/api-types/handlers/quizActions/submitAnswer";

export default function createHandlderQuiz(db: Firestore) {
  const loadNextQuestionHandler = createHandlerLoadNextQuestion(db);
  const submitAnswerHandler = createHandlerSubmitAnswer(db);
  return async function quiz(
    args: TSchema,
    cookieEngine: CookieEngine
  ): Promise<TReturn> {
    const parsedArgs = parseObjectSchema<TSchema>(args, schema);
    const registration = DocumentResult.expect<CollectionTypeRegistrations>(
      await db.collection("registrations").doc(parsedArgs.instanceId).get()
    );

    const subjectId = registration.subjectId;
    if (!subjectId) {
      throw await fileError("quiz", (ticketNumber: string) =>
        TypicalRPCErrors.MissingDataError(
          dedentTrim`
            Subject ID is missing from the registration data.
            There may be a system error, or a problem with the URL in your address bar.
            Consider reopening the quiz fromt the link you recieved in your eamil.
            `,
          ticketNumber
        )
      );
    }

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
