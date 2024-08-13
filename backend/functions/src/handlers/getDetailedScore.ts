import { Firestore } from "firebase-admin/firestore";
import lodash from "lodash";

import {
  TArgs,
  TReturn,
} from "../../common/api-types/handlers/getDetailedScore";
import { schema as schemaTArgs } from "../../common/validators/handlers/getDetailedScore";
import CookieEngine from "../../utils/CookieEngine";
import { parseObjectSchema } from "../../utils/input-validation";
import protect from "../lib/protect";
import ResponseModel from "../models/Response";

export default function createHandlerGetDetailedScore(getDB: () => Firestore) {
  return async function (
    args: TArgs,
    cookieEngine: CookieEngine
  ): Promise<TReturn> {
    const db = getDB();
    const parsedArgs = parseObjectSchema<TArgs>(args, schemaTArgs);
    await protect({
      instanceId: parsedArgs.instanceId,
      db,
      cookieEngine,
    });

    const responseData = (
      await ResponseModel.connect(db).getOne(parsedArgs.responseId)
    ).unwrap();

    return lodash.pick(responseData, [
      "gptExplanation",
      "answer",
      "supportingInfo",
    ]);
  };
}
