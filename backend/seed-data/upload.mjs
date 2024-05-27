// seed.js
// const admin = require('firebase-admin');
// const serviceAccount = require('./admin-credentials.json');
import admin from 'firebase-admin';
import serviceAccount from "./admin-credentials.js";

import path from 'path';
import fs from 'fs';


const portablePath = import.meta.url.slice("file://".length)
const osSpecificPath = process.platform == "win32" ? portablePath.slice(1).replace(/\//g,"\\") : portablePath
const __filename = osSpecificPath
const __dirname = path.dirname(__filename)

const inpatientCriteria = JSON.parse(fs.readFileSync(path.join(__dirname,"subjects","inpatient-criteria.json")))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Example command to check connection
//db.collection('test').doc('testDoc').set({ testField: 'testValue' })
//  .then(() => {
 //   console.log('Connected to Firestore and document created successfully.');
//  })
 // .catch((error) => {
 //  console.error('Error connecting to Firestore or creating document:', error);
 // });

 async function clearCollection(collectionName){
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    console.log(`No documents found in collection: ${collectionName}`);
    return;
  }

  const batch = db.batch();
  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`Cleared all documents in collection: ${collectionName}`);
 }

 async function main(){

  await clearCollection("inpatient-criteria")
  for(const criteria of inpatientCriteria){
    await db.collection("inpatient-criteria").doc(criteria.Number.toString()).set(criteria)
  }
 }

 await main()
