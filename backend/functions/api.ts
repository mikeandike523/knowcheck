/**
 * The functions used to power the "Know/Check" app
 *
 * "Know/Check" is dynamic quiz app that draws it's questions from a database and
 * uses the GPT 4 API to serve as a grader for open ended questions
 *
 * The GPT API is instructed (wiht a context prompt) to use it's general knowledge of the subject matter
 * As well as a list of supporting information unique to the question at hand
 */

// pure ts imports
import createRoute from "./lib/createRoute";
import createHandlerGetQuizInstanceData from "./src/handlers/getQuizInstanceData";
import createHandlerRegisterForQuiz from "./src/handlers/registerForQuiz";
import createHandlerListSubjects from "./src/handlers/listSubjects";
import createHandlerGetSubjectConfig from "./src/handlers/getSubjectConfig";
import createHandlerAuth from "./src/handlers/auth";
import createHandlerToken from "./src/handlers/token";

// static js/ts imports
// Because firebase is the cause of needing cjs compatibility
// it can generally be assumed that imports from firebase libraries
// are either true cjs or cjs compatible out of the box
import admin from "firebase-admin"

admin.initializeApp();
const db = admin.firestore();

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
