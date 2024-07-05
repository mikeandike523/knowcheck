"use strict";
/**
 * The functions used to power the "Know/Check" app
 *
 * "Know/Check" is dynamic quiz app that draws it's questions from a database and
 * uses the GPT 4 API to serve as a grader for open ended questions
 *
 * The GPT API is instructed (wiht a context prompt) to use it's general knowledge of the subject matter
 * As well as a list of supporting information unique to the question at hand
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// pure ts imports
const createRoute_1 = __importDefault(require("./lib/createRoute"));
const getQuizInstanceData_1 = __importDefault(require("./src/handlers/getQuizInstanceData"));
const registerForQuiz_1 = __importDefault(require("./src/handlers/registerForQuiz"));
const listSubjects_1 = __importDefault(require("./src/handlers/listSubjects"));
const getSubjectConfig_1 = __importDefault(require("./src/handlers/getSubjectConfig"));
// static js/ts imports
// Because firebase is the cause of needing cjs compatibility
// it can generally be assumed that imports from firebase libraries
// are either true cjs or cjs compatible out of the box
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp();
const db = firebase_admin_1.default.firestore();
module.exports.listSubjects = (0, createRoute_1.default)("/listSubjects", (0, listSubjects_1.default)(db));
module.exports.getSubjectConfig = (0, createRoute_1.default)("/getSubjectConfig", (0, getSubjectConfig_1.default)(db));
module.exports.registerForQuiz = (0, createRoute_1.default)("/registerForQuiz", (0, registerForQuiz_1.default)(db));
module.exports.getQuizInstanceData = (0, createRoute_1.default)("/getQuizInstanceData", (0, getQuizInstanceData_1.default)(db));
