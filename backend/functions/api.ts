/**
 * The functions used to power the "Know/Check" app
 *
 * "Know/Check" is dynamic quiz app that draws it's questions from a database and
 * uses the GPT 4 API to serve as a grader for open ended questions
 *
 * The GPT API is instructed (wiht a context prompt) to use it's general knowledge of the subject matter
 * As well as a list of supporting information unique to the question at hand
 */

import { fileError } from "./utils/rpc-server.js";
import { TypicalRPCErrors } from "./utils/rpc.js";

import admin from "firebase-admin";
import { logger } from "firebase-functions/v2";

admin.initializeApp();

const db = admin.firestore();

export const listSubjects = async () => {
  const subjects = await db
    .collection("subjects")
    .where("unlisted", "==", false)
    .get();
  logger.write({
    severity: "DEBUG",
    data: subjects.docs,
  });
  return subjects.docs.map((doc) => {
    return {
      name: doc.data().name,
      blurb: doc.data().blurb,
      id: doc.id,
    };
  });
};

export const getSubjectConfig = async (args: { id: string }) => {
  const subjectId = args.id;
  const subjectConfig = await db.collection("subjects").doc(subjectId).get();
  if (!subjectConfig.exists) {
    throw await fileError("/getSubjectConfig", (ticketNumber) => {
      return TypicalRPCErrors.InvalidAPIInputError(
        `No subject with id ${subjectId}`,
        ticketNumber,
      );
    });
  }
  const data = subjectConfig.data();
  // The API reference/typings indicate that data can be undefined
  // IDK why, but I'll handle it anyway
  if (typeof data === "undefined") {
    throw await fileError("/getSubjectConfig", (ticketNumber) => {
      return TypicalRPCErrors.MissingDataError(
        `The data for subject ${subjectId} may be missing`,
        ticketNumber,
      );
    });
  }

  return { id: subjectId, ...data };
};
