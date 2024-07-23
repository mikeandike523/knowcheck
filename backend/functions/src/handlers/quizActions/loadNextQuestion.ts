import { Firestore } from "firebase-admin/firestore";

import {
    TArgs,
    TReturn,
    argsSchema,
} from "../../../common/api-types/handlers/quizActions/loadNextQuestion";
import CookieEngine from "../../../utils/CookieEngine";
import { parseObjectSchema } from "../../../utils/input-validation";
import protect from "../../lib/protect";

export default function createHandlerLoadNextQuestion(db: Firestore) {
  return async function (
    args: TArgs,
    cookieEngine: CookieEngine
  ): Promise<TReturn> {

      const parsedArgs = parseObjectSchema(args, argsSchema);
      const claims = await protect({
        instanceId: parsedArgs.instanceId,
        db,
        cookieEngine,
      });
      // todo

  };
}
