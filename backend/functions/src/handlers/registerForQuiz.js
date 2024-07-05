"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createHandlerRegisterForQuiz;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const importers_1 = require("../importers");
function createHandlerRegisterForQuiz(db) {
    return async function registerForQuiz(args) {
        const { fileError } = await (0, importers_1.importUtilsRpcServer)();
        const { TypicalRPCErrors } = await (0, importers_1.importUtilsRpc)();
        const { createTransport } = await (0, importers_1.importNodeMailer)();
        const subjectId = args.subjectId;
        const email = args.email;
        const fullName = args.fullName;
        const subjectConfig = await db.collection("subjects").doc(subjectId).get();
        if (!subjectConfig.exists) {
            throw await fileError("/registerForQuiz", (ticketNumber) => {
                return TypicalRPCErrors.InvalidAPIInputError(`No subject with id ${subjectId}`, ticketNumber);
            });
        }
        const data = subjectConfig.data();
        if (typeof data === "undefined") {
            throw await fileError("/registerForQuiz", (ticketNumber) => {
                return TypicalRPCErrors.MissingDataError(`The data for subject ${subjectId} may be missing`, ticketNumber);
            });
        }
        // Generate an access code of 10 capital characters and digits
        const generateAccessCode = (length) => {
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
            createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(),
        });
        console.log(process.env);
        const gmailTransport = createTransport({
            service: "gmail",
            auth: {
                user: "michaelsohnenacademic@gmail.com",
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
        const liveLink = `${args.baseUrl.replace(/\/$/, "")}/quiz/${subjectId}/live/${newRegistration.id}`;
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
        });
        return {
            subjectId,
            instanceId: newRegistration.id,
        };
    };
}
