"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createHandlerGetSubjectConfig;
const importers_1 = require("../importers");
function createHandlerGetSubjectConfig(db) {
    return async function getSubjectConfig(args) {
        const { fileError } = await (0, importers_1.importUtilsRpcServer)();
        const { TypicalRPCErrors } = await (0, importers_1.importUtilsRpc)();
        const subjectId = args.id;
        const subjectConfig = await db.collection("subjects").doc(subjectId).get();
        if (!subjectConfig.exists) {
            throw await fileError("/getSubjectConfig", (ticketNumber) => {
                return TypicalRPCErrors.InvalidAPIInputError(`No subject with id ${subjectId}`, ticketNumber);
            });
        }
        const data = subjectConfig.data();
        if (typeof data === "undefined") {
            throw await fileError("/getSubjectConfig", (ticketNumber) => {
                return TypicalRPCErrors.MissingDataError(`The data for subject ${subjectId} may be missing`, ticketNumber);
            });
        }
        return { id: subjectId, ...data };
    };
}
