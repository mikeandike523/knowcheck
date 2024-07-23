import { Firestore } from "firebase-admin/firestore";
import { createTransport } from "nodemailer";
import { hash } from "argon2";

import { QuizRegistration } from "../../common/api-types";
import { TypicalRPCErrors } from "../../utils/rpc";
import { fileError } from "../../utils/rpc-server";
import { parseObjectSchema } from "../../utils/input-validation";
import { schema, TSchema,Action as QuizAction } from "../../common/validators/handlers/quiz";
import dedentTrim from "../../utils/dedentTrim";
import {QuizQuestionReponse} from "../../common/api-types/handlers/quiz";

export type QuizState = {
  subjectId: string;
  instanceId: string;
  responses:{
    [questionId: string]: QuizQuestionReponse;
  }
}


export default function createHandlderQuiz(db: Firestore) {
  return async function quiz(args: TSchema) {
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

    return null;
  };
}
