import admin from "firebase-admin";



/**
 * 
 * @param {object} [serviceAccount=undefined] -
 * An optional javascript object with service account credentials
 * Used often to power things such as automatic database migrations from the command line
 *                       
 * @returns {import("firebase-admin/firestore").Firestore} - A Firestore instance
 */
export default function initializeAndGetDB(
  serviceAccount=undefined
) {

  if(globalThis.firebaseAdminInitialized) {
    throw new Error("Firebase admin SDK has already been initialized. Check the logic of your application.")
  }

  const NODE_ENV = process.env.NODE_ENV || "development"

  admin.initializeApp({
    credential: serviceAccount?admin.credential.cert(serviceAccount):admin.credential.applicationDefault()
  });


  const db = admin.firestore();

  if(NODE_ENV === "development") {
    db.settings({
      host: "localhost:8080",
      ssl: false,
    });
  }


  globalThis.firebaseAdminInitialized = true;

  return db
}
