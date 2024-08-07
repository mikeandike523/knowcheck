/**
 * The functions used to power the "Know/Check" app
 *
 * "Know/Check" is dynamic quiz app that draws it's questions from a database and
 * uses the GPT 4 API to serve as a grader for open ended questions
 *
 * The GPT API is instructed (with a context prompt) to use it's general knowledge of the subject matter
 * As well as a list of supporting information unique to the question at hand
 */


import initializeAndGetDB from "./utils/firebase/initializeAndGetDB";

import createRoute from "./lib/createRoute";
import createHandlerAuth from "./src/handlers/auth";
import createHandlerGetQuizInstanceData from "./src/handlers/getQuizInstanceData";
import createHandlerGetSubjectConfig from "./src/handlers/getSubjectConfig";
import createHandlerListSubjects from "./src/handlers/listSubjects";
import createHandlerQuiz from "./src/handlers/quiz";
import createHandlerRegisterForQuiz from "./src/handlers/registerForQuiz";
import createHandlerToken from "./src/handlers/token";

const getDB = ()=>{
  return initializeAndGetDB(undefined,true)
}

export const listSubjects = createRoute(
  "/listSubjects",
  createHandlerListSubjects(getDB)
);
export const getSubjectConfig = createRoute(
  "/getSubjectConfig",
  createHandlerGetSubjectConfig(getDB)
);
export const registerForQuiz = createRoute(
  "/registerForQuiz",
  createHandlerRegisterForQuiz(getDB)
);
export const getQuizInstanceData = createRoute(
  "/getQuizInstanceData",
  createHandlerGetQuizInstanceData(getDB)
);

export const auth = createRoute(
  "/auth",
  createHandlerAuth(getDB)
)

export const token = createRoute(
  "/token",
  createHandlerToken(getDB)
)

export const quiz = createRoute(
  "/quiz",
  createHandlerQuiz(getDB)
)
