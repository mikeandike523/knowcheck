import { Firestore } from "firebase-admin/firestore";

import { QuizQuestionReponse } from "../../common/api-types/handlers/quiz";
import { schema, TReturn, TSchema } from "../../common/validators/handlers/quiz";
import CookieEngine from "../../utils/CookieEngine";
import dedentTrim from "../../utils/dedentTrim";
import { parseObjectSchema } from "../../utils/input-validation";
import { TypicalRPCErrors } from "../../utils/rpc";
import { fileError } from "../../utils/rpc-server";
import createHandlerLoadNextQuestion from "./quizActions/loadNextQuestion";
import createHandlerSubmitAnswer from "./quizActions/submitAnswer";

export type QuizState = {
  subjectId: string;
  instanceId: string;
  responses:{
    [questionId: string]: QuizQuestionReponse;
  }
}


export default function createHandlderQuiz(db: Firestore) {
  const loadNextQuestionHandler = createHandlerLoadNextQuestion(db);
  const submitAnswerHandler = createHandlerSubmitAnswer(db);
  return async function quiz(args: TSchema,cookieEngine: CookieEngine): Promise<TReturn> {
    const parsedArgs = parseObjectSchema<TSchema>(args, schema);
    const instanceId = parsedArgs.instanceId;
    const registration = await db
      .collection("registrations")
      .doc(parsedArgs.instanceId)
      .get();
    if (!registration.exists) {
      throw await fileError("quiz", (ticketNumber: string) =>
        TypicalRPCErrors.MissingDataError(
          dedentTrim`
            Registration data is missing.
            There may be a system error, or a problem with the URL in your address bar.
            Consider reopening the quiz fromt he link you recieved in your eamil.
            `,
          ticketNumber
        )
      );
    }
    const registrationData = registration.data()!;
    const subjectId = registrationData.subjectId;
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
    const quizState = await db.collection("quiz_states").doc(instanceId).get();
    if (!quizState.exists) {
      const initialState: QuizState = {
        subjectId,
        instanceId,
        responses: {}
      };
      await db.collection("quiz_states").doc(instanceId).set(initialState);
    }

    switch (parsedArgs.action) {
      case "loadNextQuestion":
        return await loadNextQuestionHandler(parsedArgs, cookieEngine);
      case "submitAnswer":
        return await submitAnswerHandler(parsedArgs, cookieEngine);
    }

  };
}
