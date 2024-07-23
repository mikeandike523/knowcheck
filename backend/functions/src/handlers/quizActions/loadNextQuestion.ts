import { Firestore } from "firebase-admin/firestore";

import {
  TArgs,
  TReturn,
} from "../../../common/api-types/handlers/quizActions/loadNextQuestion";
import { DocumentResult } from "../../../lib/firestore";
import CookieEngine from "../../../utils/CookieEngine";
import CollectionTypeQuestions from "../../collection-types/questions";
import CollectionTypeRegistrations from "../../collection-types/registrations";
import CollectionTypeSubjects from "../../collection-types/subjects";
import protect from "../../lib/protect";

export default function createHandlerLoadNextQuestion(db: Firestore) {
  return async function (
    args: TArgs,
    cookieEngine: CookieEngine
  ): Promise<TReturn> {
    const claims = await protect({
      instanceId: args.instanceId,
      db,
      cookieEngine,
    });
    const registration = DocumentResult.expect<CollectionTypeRegistrations>(await db.collection("registrations").doc(claims.instanceId).get());
    const subjectId = registration.subjectId;
    const instanceId = claims.instanceId;
    const existingResponses = (await db.collection("responses").where("instanceId", "==", instanceId).get()).docs.map(doc => doc.data());
    const completedQuestionIds = existingResponses.map(response => response.questionId);
    const allQuestionIds = (await db.collection("questions").where("subjectId", "==", subjectId).get()).docs.map(doc => doc.id);
    const unansweredQuestionIds = allQuestionIds.filter(questionId =>!completedQuestionIds.includes(questionId));
    if(unansweredQuestionIds.length === 0) {
      // There are no more questions left to answer in the pool of questions for this subject
      // This is an ultra rare case but still must be handled
      return null
    }
    const randomIndex = Math.floor(Math.random() * unansweredQuestionIds.length);
    const randomQuestionId = unansweredQuestionIds[randomIndex];
    const randomQuestion = DocumentResult.expect<CollectionTypeQuestions>(await db.collection("questions").doc(randomQuestionId).get());
    return randomQuestion.body;
  };
}