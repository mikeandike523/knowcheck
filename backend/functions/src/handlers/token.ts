import { Firestore } from "firebase-admin/firestore";
import { verify, sign } from "jsonwebtoken";

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
import ColorDebug from "../../utils/ColorDebug";



async function checkToken(token: string, db: Firestore) {

  const doc = await db.collection("__sessions").doc(token).get()
  if(!doc.exists){
    throw new RPCError({
      status: 401,
      logMessage: InvalidTokenReason.INVALID_TOKEN,
      cause: InvalidTokenReason.INVALID_TOKEN,
    })
  }
  const data = (doc.data()??{}) as Partial<TokenClaims>
  if(!data.expires){
    throw new RPCError({
      status: 401,
      logMessage: InvalidTokenReason.INVALID_FORMAT,
      cause: InvalidTokenReason.INVALID_FORMAT,
    });
  }
  if(Date.now() >= data.expires){
    throw new RPCError({
      status: 401,
      logMessage: InvalidTokenReason.EXPIRED,
      cause: InvalidTokenReason.EXPIRED,
    })
  }
  return data
}
async function refreshToken(claims: TokenClaims,token: string, db: Firestore) {
  try {
    await db.collection("__sessions").doc(token).delete();
  }catch(e){
    console.warn(`Failed to delete document in collections "__sessions" with id "${token}"`)
  }
  const newClaims = {
    ...claims,
    expires: Date.now() + 30 * 60 * 1000,
    maxAge: 30 * 60 * 1000,
    timestamp: Date.now(),
  }
  const newTokenText = sign(newClaims,process.env.JWT_SECRET!)

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
    const __session = cookieEngine.getBearer()
    

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

    let parsedClaims: TokenClaims| null = null

    try {
      parsedClaims = parseObjectSchema<TokenClaims>(
        claims,
        schemaTokenClaims
      );
     

    } catch (e) {
      throw new RPCError({
        status: 401,
        logMessage: InvalidTokenReason.INVALID_FORMAT,
        cause: InvalidTokenReason.INVALID_FORMAT,
      });
    }

    if(parsedClaims){
      await checkToken(__session, db);
      switch (action) {
        case "refresh":
          const newTokenText = await refreshToken(parsedClaims,__session, db);
          return newTokenText;
        case "check":
          return __session;
      }
  
    }

    throw new RPCError({
      status: 401,
      logMessage: InvalidTokenReason.INVALID_FORMAT,
      cause: InvalidTokenReason.INVALID_FORMAT,
    });
  };
}
