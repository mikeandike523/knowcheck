import admin from "firebase-admin";

import path from "path";
import fs from "fs";

const portablePath = import.meta.url.slice("file://".length);
const osSpecificPath =
  process.platform == "win32"
    ? portablePath.slice(1).replace(/\//g, "\\")
    : portablePath;
const __filename = osSpecificPath;
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "service-account-key.json")),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function clearCollection(collectionName) {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    console.log(`No documents found in collection: ${collectionName}`);
    return;
  }

  const batch = db.batch();
  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`Cleared all documents in collection: ${collectionName}`);
}

async function main() {
  // Step 1: List the subjects and their corresponding files

  await clearCollection("questions");
  await clearCollection("subjects");

  const subjectsDir = path.join(__dirname, "subjects");

  console.log(subjectsDir)

  const dataFiles = fs
    .readdirSync(subjectsDir)
    .filter((file) => file.endsWith(".cjs"));

  for (const dataFile of dataFiles) {
    const subjectData = (await import(path.join(subjectsDir, dataFile)))
      .default;
    console.log(`Processing subject: ${dataFile}`);
    console.log(subjectData);
    const subjectId = path.basename(dataFile, ".cjs");
    const subjectName = subjectData.name;
    const subjectBlurb = subjectData.blurb;
    const subjectContextPrompt = subjectData.contextPrompt;
    const subjectUserPromptTemplate = subjectData.userPromptTemplate;
    await db.collection("subjects").doc(subjectId).set({
      name: subjectName,
      blurb: subjectBlurb,
      contextPrompt: subjectContextPrompt,
      userPromptTemplate: subjectUserPromptTemplate,
      unlisted: subjectData.unlisted

    });

    for (const question of subjectData.questions) {
      const questionBody = question.body;
      const questionSupportingInfo = question.supportingInfo;
      await db.collection("questions").doc().set({
        subjectId: subjectId,
        body: questionBody,
        supportingInfo: questionSupportingInfo,
      });
    }
  }
}

await main();
