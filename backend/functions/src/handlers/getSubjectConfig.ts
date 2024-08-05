import { Firestore } from "firebase-admin/firestore";

import { fileError } from "../../utils/rpc-server";
import { TypicalRPCErrors } from "../../utils/rpc";


export default function createHandlerGetSubjectConfig(
    getDB: ()=>Firestore
) {
    return async function getSubjectConfig (args: { id: string }) {
      const db = getDB();
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

