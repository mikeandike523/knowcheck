import { Firestore } from "firebase-admin/firestore";
import { verify } from "jsonwebtoken";

import {
  schema,
  TSchema,
  actions,
} from "../../common/validators/handlers/token";
import { parseApiInput } from "../../utils/input-validation";
import { TokenClaims } from "../../common/api-types";
import CookieEngine from "../../utils/CookieEngine";
import { RPCError } from "../../utils/rpc";
import {
  schemaTokenClaims,
  TSchemaTokenClaims,
} from "../../common/validators/index";

async function checkToken(claims: TokenClaims, db: Firestore) {
  //placeholder
}
async function refreshToken(claims: TokenClaims, db: Firestore) {
  //placeholder
  return claims;
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
    const parsedArgs = parseApiInput<TSchema>(args, schema);
    const action = parsedArgs.action;
    const access_token = cookieEngine.getCookie("access_token");
    if (!access_token) {
      throw new RPCError({
        status: 401,
        userFacingMessage: "Access token is required",
        logMessage: "Access token is required for this action",
      });
    }

    const claims = verify(
      access_token,
      process.env.JWT_SECRET!
    ) as object as Partial<TokenClaims>;

    try {
      // Clever trick, we use a parseApiInput to check that the structure of the claims is correct,
      // as if token verification itself was an api
      const parsedClaims = parseApiInput<TSchemaTokenClaims>(
        claims,
        schemaTokenClaims
      );
      await checkToken(parsedClaims,db);
      switch (action) {
        case "refresh":
          const newClaims = await refreshToken(parsedClaims,db);
          return newClaims;
        case "check":
          return parsedClaims;
      }
    } catch (e) {
      throw new RPCError({
        status: 401,
        userFacingMessage: "Invalid access token",
        logMessage: "Invalid access token: incorrect format",
        cause: e,
      });
    }
  };
}
