import { Firestore } from "firebase-admin/firestore";
import CookieEngine from "../../utils/CookieEngine.js";
import { verify } from "argon2";
import jwt from "jsonwebtoken";

import { RPCError, TypicalRPCErrors } from "../../utils/rpc.js";
import { parseObjectSchema } from "../../utils/input-validation";
import { fileError } from "../../utils/rpc-server.js";
import { schema, TSchema } from "../../common/validators/handlers/auth";
import { TokenClaims } from "../../common/api-types/index.js";

export default function createHandlerAuth(getDB: ()=>Firestore) {
  return async function auth(
    args: TSchema,
    cookieEngine: CookieEngine
  ): Promise<string> {
    const db = getDB();
    const parsedArgs = parseObjectSchema(args, schema);

    const { subjectId, instanceId, accessCode } = parsedArgs;

    // 1. Check subjectId against document ids in the subjects collection to ensure it exists
    const subjectDoc = await db.collection("subjects").doc(subjectId).get();
    if (!subjectDoc.exists) {
      throw await fileError("/auth", (ticketNumber: string) =>
        TypicalRPCErrors.MissingDataError(
          `Subject ID ${subjectId} does not exist`,
          ticketNumber
        )
      );
    }

    // 2. Check that the instanceId exists in the "registrations" collection
    const registrationDoc = await db
      .collection("registrations")
      .doc(instanceId)
      .get();
    if (!registrationDoc.exists) {
      throw await fileError("/auth", (ticketNumber: string) =>
        TypicalRPCErrors.MissingDataError(
          `Instance ID ${instanceId} does not exist`,
          ticketNumber
        )
      );
    }

    // 3. Use argon2 to verify the accessCode hash from the registration document
    const registrationData = registrationDoc.data();
    if (!registrationData || !registrationData.accessCodeHash) {
      throw await fileError("/auth", (ticketNumber: string) =>
        TypicalRPCErrors.MissingDataError(
          `Access code hash not found for Instance ID ${instanceId}`,
          ticketNumber
        )
      );
    }

    const isAccessCodeValid = await verify(
      registrationData.accessCodeHash,
      accessCode
    );
    if (!isAccessCodeValid) {
      throw new RPCError({
        status: 401,
        userFacingMessage: "Invalid access code",
        logMessage: "Provided access code does not match the one stored in the database",
      })
    }

    // 4. If verified, begin the process of generating an access code and corresponding jwt token
    const now = Date.now();
    const expiresIn = 30 * 60 * 1000; // 30 minutes in milliseconds
    const claims: TokenClaims= {
      subjectId: subjectDoc.id,
      instanceId: parsedArgs.instanceId,
      timestamp: now,
      expires: now + expiresIn,
      maxAge: expiresIn,
      path: "/quiz/"+subjectId+"/live/"+instanceId
    };

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    const token = jwt.sign(claims, process.env.JWT_SECRET);

    await db.collection("__sessions").doc(token).set(claims)

    
    return token;
  };
}
