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
import { QuizRegistration } from "./common/api-types";
import { createTransport } from "nodemailer";

import admin from "firebase-admin";
import { logger } from "firebase-functions/v2";

admin.initializeApp();

const db = admin.firestore();

export const listSubjects = async () => {
  const subjects = await db
    .collection("subjects")
    .where("unlisted", "==", false)
    .get();
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
        ticketNumber
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
        ticketNumber
      );
    });
  }

  return { id: subjectId, ...data };
};

export const registerForQuiz = async (args: {
  subjectId: string;
  email: string;
  fullName: string;
  baseUrl: string;
}): Promise<QuizRegistration> => {
  const subjectId = args.subjectId;
  const email = args.email;
  const fullName = args.fullName;
  const subjectConfig = await db.collection("subjects").doc(subjectId).get();
  if (!subjectConfig.exists) {
    throw await fileError("/registerForQuiz", (ticketNumber) => {
      return TypicalRPCErrors.InvalidAPIInputError(
        `No subject with id ${subjectId}`,
        ticketNumber
      );
    });
  }
  const data = subjectConfig.data();
  // The API reference/typings indicate that data can be undefined
  // IDK why, but I'll handle it anyway
  if (typeof data === "undefined") {
    throw await fileError("/registerForQuiz", (ticketNumber) => {
      return TypicalRPCErrors.MissingDataError(
        `The data for subject ${subjectId} may be missing`,
        ticketNumber
      );
    });
  }

  // Generate an access code of 10 capital characters and digits
  const generateAccessCode = (length: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const accessCode = generateAccessCode(10);

  // Create a new document in the registrations collection
  const newRegistration = await db.collection("registrations").add({
    subjectId,
    email,
    fullName,
    accessCode,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log(process.env)

  const gmailTransport = createTransport({
    service: "gmail",
    auth: {
      user: "michaelsohnenacademic@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const liveLink = `${args.baseUrl.replace(/\/$/,'')}/quiz/${subjectId}/live/${newRegistration.id}`;

  await gmailTransport.sendMail({
    from: "Know/Check Administrator <michaelsohnenacademic@gmail.com>",
    to: email,
    subject: `Registration for Quiz ${data.name}`,
    html: `
      <h1>Welcome to Know/Check!</h1>
      <p>You have been registered for the "${data.name}" quiz.</p>
      <p>Your access code is: <b>${accessCode}</b></p>
      <p>Please visit <a href="${liveLink}">${liveLink}</a> to take the quiz.</p>
    `,
  })

  // Return the necessary data
  return {
    subjectId,
    instanceId: newRegistration.id,
  };
};
