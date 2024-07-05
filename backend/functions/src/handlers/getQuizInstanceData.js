"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createHandlerGetQuizInstanceData;
const importers_1 = require("../importers");
function createHandlerGetQuizInstanceData(db) {
    return async function getQuizInstanceData(args) {
        const { fileError } = await (0, importers_1.importUtilsRpcServer)();
        const { TypicalRPCErrors } = await (0, importers_1.importUtilsRpc)();
        const subjectId = args.subjectId;
        const instanceId = args.instanceId;
        const subjectConfig = await db.collection("subjects").doc(subjectId).get();
        if (!subjectConfig.exists) {
            throw await fileError("/getQuizInstanceData", (ticketNumber) => {
                return TypicalRPCErrors.InvalidAPIInputError(`No subject with id ${subjectId}`, ticketNumber);
            });
        }
        const data = subjectConfig.data();
        if (typeof data === "undefined") {
            throw await fileError("/getQuizInstanceData", (ticketNumber) => {
                return TypicalRPCErrors.MissingDataError(`The data for subject ${subjectId} may be missing`, ticketNumber);
            });
        }
        const registrationData = await db
            .collection("registrations")
            .doc(instanceId)
            .get();
        if (!registrationData.exists) {
            throw await fileError("/getQuizInstanceData", (ticketNumber) => {
                return TypicalRPCErrors.InvalidAPIInputError(`No registration with id ${instanceId}`, ticketNumber);
            });
        }
        const registration = registrationData.data();
        if (typeof registration === "undefined") {
            throw await fileError("/getQuizInstanceData", (ticketNumber) => {
                return TypicalRPCErrors.MissingDataError(`The data for registration ${instanceId} may be missing`, ticketNumber);
            });
        }
        return {
            fullName: registration.fullName,
            quizName: data.name,
        };
    };
}
