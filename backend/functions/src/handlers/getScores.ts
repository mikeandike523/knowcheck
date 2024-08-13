import { DocumentSnapshot, Firestore } from "firebase-admin/firestore";
import lodash from "lodash";

import {
  ResponsePreview,
  TArgs,
  TReturn,
} from "../../common/api-types/handlers/getScores";
import CookieEngine from "../../utils/CookieEngine";
import { schema as schemaTArgs } from "../../common/validators/handlers/getScores";
import { parseObjectSchema } from "../../utils/input-validation";
import protect from "../lib/protect";
import { ResponseData } from "../models/Response";

export default function createHandlerGetScores(getDB: () => Firestore) {
  return async function getScores(
    args: TArgs,
    cookieEngine: CookieEngine
  ): Promise<TReturn> {
    const db = getDB();
    const parsedArgs = parseObjectSchema<TArgs>(args, schemaTArgs);
    const instanceId = parsedArgs.instanceId;
    await protect({
      instanceId: parsedArgs.instanceId,
      db,
      cookieEngine,
    });
    const responses = (
      await db
        .collection("responses")
        .where("instanceId", "==", instanceId)
        .get()
    ).docs as Array<DocumentSnapshot<ResponseData>>;
    const previews: TReturn = {};
    for (const response of responses) {
      const id = response.id;
      const data = response.data();
      previews[id] = lodash.pick(data, [
        "questionText",
        "gptScore",
      ]) as ResponsePreview;
    }

    return previews;
  };
}
