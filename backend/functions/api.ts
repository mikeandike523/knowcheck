/**
 * The functions used to power the "Know/Check" app
 *
 * "Know/Check" is dynamic quiz app that draws it's questions from a database and
 * uses the GPT 4 API to serve as a grader for open ended questions
 *
 * The GPT API is instructed (wiht a context prompt) to use it's general knowledge of the subject matter
 * As well as a list of supporting information unique to the question at hand
 */

import admin from "firebase-admin"

import initializeAndGetDB from "./utils/firebase/initializeAndGetDB";

import createRoute from "./lib/createRoute";
import createHandlerGetQuizInstanceData from "./src/handlers/getQuizInstanceData";
import createHandlerRegisterForQuiz from "./src/handlers/registerForQuiz";
import createHandlerListSubjects from "./src/handlers/listSubjects";
import createHandlerGetSubjectConfig from "./src/handlers/getSubjectConfig";
import createHandlerAuth from "./src/handlers/auth";
import createHandlerToken from "./src/handlers/token";
import createHandlerQuiz from "./src/handlers/quiz";

const db = initializeAndGetDB()

export const listSubjects = createRoute(
  "/listSubjects",
  createHandlerListSubjects(db)
);
export const getSubjectConfig = createRoute(
  "/getSubjectConfig",
  createHandlerGetSubjectConfig(db)
);
export const registerForQuiz = createRoute(
  "/registerForQuiz",
  createHandlerRegisterForQuiz(db)
);
export const getQuizInstanceData = createRoute(
  "/getQuizInstanceData",
  createHandlerGetQuizInstanceData(db)
);

export const auth = createRoute(
  "/auth",
  createHandlerAuth(db)
)

export const token = createRoute(
  "/token",
  createHandlerToken(db)
)

export const quiz = createRoute(
  "/quiz",
  createHandlerQuiz(db)
)
