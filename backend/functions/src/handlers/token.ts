import { Firestore } from "firebase-admin/firestore";
import { verify } from "jsonwebtoken";

import {
  schema,
  TSchema,
  actions,
} from "../../common/validators/handlers/token";
import { parseObjectSchema } from "../../utils/input-validation";
import { TokenClaims } from "../../common/api-types";
import CookieEngine from "../../utils/CookieEngine";
import { RPCError } from "../../utils/rpc";
import {
  schemaTokenClaims,
} from "../../common/validators/index";
import { InvalidTokenReason } from "../../common/api-types";



async function checkToken(claims: TokenClaims, db: Firestore) {
  const docs = (
    await db
      .collection("access_tokens")
      .where("subjectId", "==", claims.subjectId)
      .where("instanceId", "==", claims.instanceId)
      .get()
  ).docs;
  if (docs.length === 0) {
    throw new RPCError({
      status: 401,
      logMessage: InvalidTokenReason.INVALID_TOKEN,
      cause: InvalidTokenReason.INVALID_TOKEN,
    });
  }
  // Partial just in case
  const latestDoc = docs.pop()!
  const latest = latestDoc.data()??{} as Partial<TokenClaims>;
  if(!latest.data.expires){
    throw new RPCError({
      status: 401,
      logMessage: InvalidTokenReason.INVALID_FORMAT,
      cause: InvalidTokenReason.INVALID_FORMAT,
    });
  }
  if(Date.now() >= latest.expires){
    throw new RPCError({
      status: 401,
      logMessage: InvalidTokenReason.EXPIRED,
      cause: InvalidTokenReason.EXPIRED,
    })
  }
  return docs.map(doc=>doc.id)
}
async function refreshToken(claims: TokenClaims, db: Firestore) {
  const docsToCleanup = await checkToken(claims, db);
  for(const docId of docsToCleanup){
    await db.collection("access_tokens").doc(docId).delete();
  }
  const newClaims = {
    ...claims,
    expires: Date.now() + 30 * 60 * 1000,
    maxAge: 30 * 60 * 1000,
    timestamp: Date.now(),
  }
  await db.collection("access_tokens").add(newClaims);
  return newClaims;
}

export default function createHandlerToken(db: Firestore) {
  return async function token(
    args: TSchema,
    cookieEngine: CookieEngine
  ): Promise<TokenClaims> {
    // All data in the token claims, in the case o this specific application, is public/not privelaged data
    // Even isntanceId and subejctId are public as its present in the url
    // This would NOT necessarily be true of every single app
    // Some app smay need to return only info about login date and expiry, or none at all
    const parsedArgs = parseObjectSchema<TSchema>(args, schema);
    const action = parsedArgs.action;
    const access_token = cookieEngine.getCookie("access_token");
    if (!access_token) {
      throw new RPCError({
        status: 401,
        logMessage: InvalidTokenReason.MISSING_TOKEN,
        cause: InvalidTokenReason.MISSING_TOKEN,
      });
    }

    const claims = verify(
      access_token,
      process.env.JWT_SECRET!
    ) as object as Partial<TokenClaims>;

    try {
      const parsedClaims = parseObjectSchema<TokenClaims>(
        claims,
        schemaTokenClaims
      );
      await checkToken(parsedClaims, db);
      switch (action) {
        case "refresh":
          const newClaims = await refreshToken(parsedClaims, db);
          return newClaims;
        case "check":
          return parsedClaims;
      }
    } catch (e) {
      throw new RPCError({
        status: 401,
        logMessage: InvalidTokenReason.INVALID_FORMAT,
        cause: InvalidTokenReason.INVALID_FORMAT,
      });
    }
  };
}
