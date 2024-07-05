import { Firestore } from "firebase-admin/firestore";

import { 
    importUtilsRpc,
    importUtilsRpcServer
 } from "../importers";


export default function createHandlerGetSubjectConfig(
    db: Firestore
) {
    return async function getSubjectConfig (args: { id: string }) {
        const { fileError } = await importUtilsRpcServer();
        const { TypicalRPCErrors } =
          await importUtilsRpc();
        const subjectId = args.id;
        const subjectConfig = await db.collection("subjects").doc(subjectId).get();
        if (!subjectConfig.exists) {
          throw await fileError("/getSubjectConfig", (ticketNumber: string) => {
            return TypicalRPCErrors.InvalidAPIInputError(
              `No subject with id ${subjectId}`,
              ticketNumber
            );
          });
        }
        const data = subjectConfig.data();
        if (typeof data === "undefined") {
          throw await fileError("/getSubjectConfig", (ticketNumber: string) => {
            return TypicalRPCErrors.MissingDataError(
              `The data for subject ${subjectId} may be missing`,
              ticketNumber
            );
          });
        }
        return { id: subjectId, ...data };
      };
}

