import { hash } from "argon2";
import { Firestore } from "firebase-admin/firestore";

import { QuizRegistration } from "../../common/api-types";
import { schema, TSchema } from "../../common/validators/handlers/registerForQuiz";
import { parseObjectSchema } from "../../utils/input-validation";
import { TypicalRPCErrors } from "../../utils/rpc";
import { fileError } from "../../utils/rpc-server";
import { sendHTMLEmail } from "../../lib/emailing";


export default function createHandlerRegisterForQuiz(db: Firestore) {
  return async function registerForQuiz(args: TSchema): Promise<QuizRegistration> {
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


    const newRegistration = await db.collection("registrations").add({
      subjectId,
      email,
      fullName,
      accessCodeHash,
      timestamp: Date.now(),
    });

    // const gmailTransport = createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "michaelsohnenacademic@gmail.com",
    //     pass: process.env.GMAIL_APP_PASSWORD,
    //   },
    // });

    const liveLink = `${parsedArgs.baseUrl.replace(/\/$/, "")}/quiz/${subjectId}/live/${newRegistration.id}`;

    // await gmailTransport.sendMail({
    //   from: "Know/Check Administrator <michaelsohnenacademic@gmail.com>",
    //   to: email,
    //   subject: `Registration for Quiz ${data.name}`,
    //   html: `
    //         <h1>Welcome to Know/Check!</h1>
    //         <p>You have been registered for the "${data.name}" quiz.</p>
    //         <p>Your access code is: <b>${accessCode}</b></p>
    //         <p>Please visit <a href="${liveLink}">${liveLink}</a> to take the quiz.</p>
    //       `,
    // });

    const htmlContent = `
    <div style="display:flex;flex-direction:column;width:100%;align-items:center;gap:0.5em">
      <div style="align-self:flex-start;border:1px solid black;">
            <div style="font-size:150%;font-weight:bold;color:hsla(10, 79%, 51%, 1)">Know/Check</div>
            <i>By Wired Hyena LLC</i>
      </div>
      <h1>Welcome to Know/Check!</h1>
      <p>You have been registered for the "${data.name}" quiz.</p>
      <p>Your access code is: <b>${accessCode}</b></p>
      <p>Please visit <a href="${liveLink}">${liveLink}</a> to take the quiz.</p>
    </div>
    `

    await sendHTMLEmail(
      "service@wiredhyena.com",
      "Wired Hyena LLC Products Service",
      email,
      fullName,
      `Registration for Quiz ${data.name}`,
      htmlContent,
    )

    return {
      subjectId,
      instanceId: newRegistration.id,
    };
  };
}
