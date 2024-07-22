import { Firestore } from "firebase-admin/firestore";
import { sign, verify } from "jsonwebtoken";

import { InvalidTokenReason, TokenClaims } from "../../common/api-types";
import { schema, TSchema } from "../../common/validators/handlers/token";
import { schemaTokenClaims } from "../../common/validators/index";
import CookieEngine from "../../utils/CookieEngine";
import { parseObjectSchema } from "../../utils/input-validation";
import { RPCError } from "../../utils/rpc";
import protect from "../lib/protect";

async function refreshToken(claims: TokenClaims, token: string, db: Firestore) {
  try {
    await db.collection("__sessions").doc(token).delete();
  } catch (e) {
    console.warn(
      `Failed to delete document in collections "__sessions" with id "${token}"`
    );
  }
  const newClaims = {
    ...claims,
    expires: Date.now() + 30 * 60 * 1000,
    maxAge: 30 * 60 * 1000,
    timestamp: Date.now(),
  };
  const newTokenText = sign(newClaims, process.env.JWT_SECRET!);

  await db.collection("__sessions").doc(newTokenText).set(newClaims);
  return newTokenText;
}

export default function createHandlerToken(db: Firestore) {
  return async function token(
    args: TSchema,
    cookieEngine: CookieEngine
  ): Promise<string> {
    const parsedArgs = parseObjectSchema<TSchema>(args, schema);
    const action = parsedArgs.action;
    const instanceId = parsedArgs.instanceId;

    const __session = cookieEngine.getBearer();

    if (!__session) {
      throw new RPCError({
        status: 401,
        logMessage: InvalidTokenReason.MISSING_TOKEN,
        cause: InvalidTokenReason.MISSING_TOKEN,
      });
    }

    const claims = verify(
      __session,
      process.env.JWT_SECRET!
    ) as object as Partial<TokenClaims>;

    const parsedClaims = await protect({
      db,
      instanceId,
      cookieEngine,
    });
    switch (action) {
      case "refresh":
        const newTokenText = await refreshToken(parsedClaims, __session, db);
        return newTokenText;
      case "check":
        return __session;
    }

    throw new RPCError({
      status: 401,
      logMessage: InvalidTokenReason.INVALID_FORMAT,
      cause: InvalidTokenReason.INVALID_FORMAT,
    });
  };
}
