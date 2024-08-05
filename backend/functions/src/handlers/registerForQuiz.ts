import { hash } from "argon2";
import { Firestore } from "firebase-admin/firestore";

import { QuizRegistration } from "../../common/api-types";
import {
  schema,
  TSchema,
} from "../../common/validators/handlers/registerForQuiz";
import { sendHTMLEmail } from "../../lib/emailing";
import { parseObjectSchema } from "../../utils/input-validation";
import { TypicalRPCErrors } from "../../utils/rpc";
import { fileError } from "../../utils/rpc-server";

export default function createHandlerRegisterForQuiz(getDB: ()=>Firestore) {
  return async function registerForQuiz(
    args: TSchema
  ): Promise<QuizRegistration> {
    const db = getDB();
    const parsedArgs = parseObjectSchema<TSchema>(args, schema);
    const subjectId = parsedArgs.subjectId;
    const email = args.email;
    const fullName = args.fullName;
    const subjectConfig = await db.collection("subjects").doc(subjectId).get();
    if (!subjectConfig.exists) {
      throw await fileError("/registerForQuiz", (ticketNumber: string) => {
        return TypicalRPCErrors.InvalidAPIInputError(
          `No subject with id ${subjectId}`,
          ticketNumber
        );
      });
    }
    const data = subjectConfig.data();
    if (typeof data === "undefined") {
      throw await fileError("/registerForQuiz", (ticketNumber: string) => {
        return TypicalRPCErrors.MissingDataError(
          `The data for subject ${subjectId} may be missing`,
          ticketNumber
        );
      });
    }

    const generateAccessCode = (length: number) => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const accessCode = generateAccessCode(10);

    const accessCodeHash = await hash(accessCode);

    let isDuplicate = false
    
    const existingRegistrations = await db
      .collection("registrations")
      .where("email", "==", email.toLowerCase())
      .where("subjectId", "==", subjectId)
      .get();

    const existingRegistration =
      existingRegistrations.docs.length > 0
        ? existingRegistrations.docs[0]
        : null;

    if (existingRegistration) {
      isDuplicate = true;
    }

    existingRegistration?(await db
      .collection("registrations")
      .doc( existingRegistration.id )
      .set({
        subjectId,
        email,
        fullName,
        accessCodeHash,
        timestamp: Date.now(),
      })):(
        await db
         .collection("registrations")
         .add({
            subjectId,
            email,
            fullName,
            accessCodeHash,
            timestamp: Date.now(),
          })
      )

    const allRegistrations = await db.collection("registrations").where(
      "subjectId",
      "==",
      subjectId
    ).where(
      "email",
      "==",
      email.toLowerCase()
    ).orderBy(
      "timestamp",
      "desc"
    ).get();

    const latestRegistration = allRegistrations.docs.length > 0 ? allRegistrations.docs[0] : null

    if(!latestRegistration) {
      throw await fileError("/registerForQuiz", (ticketNumber: string) => {
        return TypicalRPCErrors.MissingDataError(
          `Could not retrieve id of created or updated registration.`,
          ticketNumber
        );
      });
    }

    const newId = latestRegistration.id

    const liveLink = `${parsedArgs.baseUrl.replace(/\/$/, "")}/quiz/${subjectId}/live/${newId}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Basic styles for email compatibility */
    body, table, td, a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
    }
    body {
      margin: 0;
      padding: 0;
      width: 100%;
    }
    table {
      border-collapse: collapse !important;
    }
    body, #bodyTable, #bodyCell {
      height: 100%;
      margin: 0;
      padding: 0;
      width: 100%;
    }
  </style>
</head>
<body>
  <center>
    <table id="bodyTable" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td id="bodyCell" align="center" valign="top">
          <!-- Container table -->
          <table width="600" cellspacing="0" cellpadding="20" border="0" style="max-width: 600px; border: 1px solid #000;">
            <tr>
              <td align="left" style="padding-bottom: 10px;">
                <div style="font-size: 24px; font-weight: bold; color: #D94E31;">Know/Check</div>
                <i>By Wired Hyena LLC</i>
              </td>
            </tr>
            <tr>
              <td align="center">
                <h1 style="margin: 0; padding: 0;">Welcome to Know/Check!</h1>
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="margin: 0; padding: 0;">You have been registered for the "<b>${data.name}</b>" quiz.</p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="margin: 0; padding: 0;">Your access code is: <b>${accessCode}</b></p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="margin: 0; padding: 0;">Please visit <a href="${liveLink}">${liveLink}</a> to take the quiz.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`;

    await sendHTMLEmail(
      `knowcheck-quiz-registration-${newId}@wiredhyena.com`,
      "service@wiredhyena.com",
      "Wired Hyena LLC Product Services",
      email,
      fullName,
      `Registration for Quiz ${data.name}`,
      htmlContent
    );

    return {
      subjectId,
      instanceId: newId,
      isDuplicate,
    };
  };
}
