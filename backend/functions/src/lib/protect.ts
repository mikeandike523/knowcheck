import { Firestore } from "firebase-admin/firestore";

import CookieEngine from "../../utils/CookieEngine";
import { RPCError, TypicalRPCErrors } from "../../utils/rpc";
import { InvalidTokenReason } from "../../common/api-types";

export default async function protect({
  instanceId,
  db,
  cookieEngine,
}: {
  instanceId: string;
  db: Firestore;
  cookieEngine: CookieEngine;
}) {
  const __session = cookieEngine.getBearer()
  
  if (!__session) {
    throw new RPCError({
      status: 401,
      logMessage: "Missing bearer token",
      userFacingMessage: "noa ctive login session.",
      cause:InvalidTokenReason.MISSING_TOKEN
    })
  }
}
