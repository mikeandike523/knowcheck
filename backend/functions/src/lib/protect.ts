import { Firestore } from "firebase-admin/firestore";

import CookieEngine from "../../utils/CookieEngine";
import { RPCError, TypicalRPCErrors } from "../../utils/rpc";
import { InvalidTokenReason } from "../../common/api-types";
import { fileError } from "../../utils/rpc-server";
import { TokenClaims } from "../../common/api-types";
import { verify } from "jsonwebtoken";
import { schemaTokenClaims } from "../../common/validators";
import { parseObjectSchema } from "../../utils/input-validation";
import dedentTrim from "../../utils/dedentTrim";

export default async function protect({
  instanceId,
  db,
  cookieEngine,
}: {
  instanceId: string;
  db: Firestore;
  cookieEngine: CookieEngine;
}) {
  const __session = cookieEngine.getBearer();

  if (!__session) {
    throw new RPCError({
      status: 401,
      logMessage: "Missing bearer token",
      userFacingMessage: "No active login session.",
      cause: InvalidTokenReason.MISSING_TOKEN,
    });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw await fileError("middleware:protect", (ticketNumber: string) =>
      TypicalRPCErrors.GeneralServerError(
        "Missing JWT_SECRET environement variable.",
        ticketNumber
      )
    );
  }

  try {
    const claims: Partial<TokenClaims> = verify(__session, secret) as object;
    try {
      const parsedClaims = parseObjectSchema(
        claims,
        schemaTokenClaims
      ) as TokenClaims;
      const expires = parsedClaims.expires;
      if (Date.now() >= expires) {
        throw new RPCError({
          status: 401,
          logMessage: "Token expired",
          userFacingMessage:
            "Your login session has expired. Please login again.",
          cause: InvalidTokenReason.EXPIRED,
        });
      }
      if (parsedClaims.instanceId !== instanceId) {
        throw new RPCError({
          status: 403,
          logMessage: "Invalid instance ID",
          userFacingMessage: dedentTrim`
          Your login session may be for a different quiz or is not valid.
          Try closing the browser tab and logging into the quiz again from the link in your email.
          `,
          cause: InvalidTokenReason.INVALID_TOKEN,
        });
      }
      const foundSession = await db
        .collection("__sessions")
        .doc(__session)
        .get();
      if (!foundSession.exists) {
        throw new RPCError({
          status: 403,
          logMessage:
            'Login token not found in Firestore "_sessions" collection.',
          userFacingMessage: "Login token is invalid or revoked.",
          cause: InvalidTokenReason.INVALID_TOKEN,
        });
      }
      return parsedClaims;
    } catch (e) {
      throw new RPCError({
        status: 401,
        logMessage: "Invalid token format",
        userFacingMessage: "Invalid login tokin format.",
        cause: InvalidTokenReason.INVALID_FORMAT,
      });
    }
  } catch (e) {
    throw new RPCError({
      status: 401,
      logMessage: "Invalid bearer token",
      userFacingMessage: "Invalid or expired login session.",
      cause: InvalidTokenReason.INVALID_TOKEN,
    });
  }
}
