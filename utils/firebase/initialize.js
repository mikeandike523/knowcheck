import admin from "firebase-admin";

/**
 * @typedef {object} FirebaseResources
 * 
 * @property {import("firebase-admin/firestore").Firestore} db - A Firestore instance
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
    if (globalThis.firestoreDB) {
      return globalThis.firestoreDB;
    }
  }

  if (plainInitialize) {
    admin.initializeApp();
  } else {
    admin.initializeApp(
      serviceAccount
        ? { credential: admin.credential.cert(serviceAccount) }
        : {}
    )
  }

  const db = admin.firestore();

  if (process.env.FUNCTIONS_EMULATOR === "true" || forceUseDatabaseEmulator) {
    db.settings({
      host: "localhost:8080",
      ssl: false,
    });
  }

  globalThis.firebaseAdminInitialized = true;
  globalThis.firestoreDB = db;

  return {db}
}
