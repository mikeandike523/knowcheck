import { Firestore } from "firebase-admin/firestore";

import { fileError } from "../../utils/rpc-server";
import { TypicalRPCErrors } from "../../utils/rpc";

export default function createHandlerGetQuizInstanceData(getDB: ()=>Firestore) {
  return async function getQuizInstanceData(args: {
    subjectId: string;
    instanceId: string;
  }) {
    const db = getDB();

    const subjectId = args.subjectId;
    const instanceId = args.instanceId;
    const subjectConfig = await db.collection("subjects").doc(subjectId).get();
    if (!subjectConfig.exists) {
      throw await fileError("/getQuizInstanceData", (ticketNumber: string) => {
        return TypicalRPCErrors.InvalidAPIInputError(
          `No subject with id ${subjectId}`,
          ticketNumber
        );
      });
    }
    const data = subjectConfig.data();
    if (typeof data === "undefined") {
      throw await fileError("/getQuizInstanceData", (ticketNumber: string) => {
        return TypicalRPCErrors.MissingDataError(
          `The data for subject ${subjectId} may be missing`,
          ticketNumber
        );
      });
    }

    const registrationData = await db
      .collection("registrations")
      .doc(instanceId)
      .get();

    if (!registrationData.exists) {
      throw await fileError("/getQuizInstanceData", (ticketNumber: string) => {
        return TypicalRPCErrors.InvalidAPIInputError(
          `No registration with id ${instanceId}`,
          ticketNumber
        );
      });
    }

    const registration = registrationData.data();
    if (typeof registration === "undefined") {
      throw await fileError("/getQuizInstanceData", (ticketNumber: string) => {
        return TypicalRPCErrors.MissingDataError(
          `The data for registration ${instanceId} may be missing`,
          ticketNumber
        );
      });
    }

    return {
      quizName: data.name,
    };
  };
}
