import admin from "firebase-admin";

/**
 * @typedef {object} FirebaseResources
 *
 * @property {import("firebase-admin/firestore").Firestore} db
 * @property {import("firebase-admin/auth").Auth} auth
 */

/**
 *
 * @param {object} [serviceAccount=undefined] -
 * An optional javascript object with service account credentials
 * Used often to power things such as automatic database migrations from the command line
 *
 * @returns {FirebaseResources} - A collection of Firestore powered application resources
 */
export default function initialize(
  serviceAccount = undefined,
  plainInitialize = false,
  forceUseDatabaseEmulator = false
) {
  if (globalThis.firebaseAdminInitialized) {
    if (globalThis.firestoreDB && globalThis.auth) {
      return {
        db: globalThis.firestoreDB,
        auth: globalThis.auth,
      };
    }
  }

  if (plainInitialize) {
    admin.initializeApp();
  } else {
    admin.initializeApp(
      serviceAccount
        ? { credential: admin.credential.cert(serviceAccount) }
        : {}
    );
  }

  const auth = admin.auth();

  const db = admin.firestore();

  if (process.env.FUNCTIONS_EMULATOR === "true" || forceUseDatabaseEmulator) {
    db.settings({
      host: "localhost:8080",
      ssl: false,
    });
  }

  globalThis.firebaseAdminInitialized = true;
  globalThis.firestoreDB = db;
  globalThis.auth = auth;

  return { db, auth };
}
