import fs from "fs";
import path from "path";
import chalk from "chalk";
import prompts from "prompts";
import { clearCollection } from "../../utils/firestore/collections.js";
import db from "./utils/db.js";

// Function to get current datetime as a string
function getCurrentDatetime() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, "-");
}

// Function to backup the data from the collection
async function backupCollectionData(collectionName, backupDir) {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();
  const data = [];

  snapshot.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() });
  });

  const backupFilename = `${getCurrentDatetime()}_${collectionName}.json`;
  const backupPath = path.join(backupDir, backupFilename);

  fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
  console.log(chalk.blue(`Backup saved to ${backupPath}`));
}

async function reseedCollectionWithStableIds(collectionName, seedDocuments, uniqueContentFieldName) {
  const collectionRef = db.collection(collectionName);

  // Step 1: Download the snapshot of the current collection
  const snapshot = await collectionRef.get();
  const existingDataMap = {};

  snapshot.forEach(doc => {
    existingDataMap[doc.id] = doc.data();
  });

  // Step 2: Create a mapping for seed data based on the unique content field
  const seedDataMap = {};
  const seedDataNew = []; // To track new data that needs new IDs

  for (const doc of seedDocuments) {
    const uniqueValue = doc[uniqueContentFieldName];
    let matched = false;

    // Find if there's a matching document in the existing collection
    for (const [id, content] of Object.entries(existingDataMap)) {
      if (content[uniqueContentFieldName] === uniqueValue) {
        seedDataMap[id] = doc; // Map the existing ID to the updated content
        delete existingDataMap[id]; // Remove from existingDataMap since it's handled
        matched = true;
        break;
      }
    }

    // If no match, it's a new document
    if (!matched) {
      seedDataNew.push(doc);
    }
  }

  // Step 3: Clear the existing collection
  await clearCollection(db, collectionName);

  // Step 4: Upload documents with stable IDs
  for (const [id, content] of Object.entries(seedDataMap)) {
    await collectionRef.doc(id).set(content);
    console.log(`Updated existing document with ID: ${id}`);
  }

  // Step 5: Upload new documents with auto-generated IDs
  for (const newDoc of seedDataNew) {
    const newDocRef = collectionRef.doc();
    await newDocRef.set(newDoc);
    console.log(`Uploaded new document with generated ID: ${newDocRef.id}`);
  }

  // Step 6: Report any removed items (not in seed data anymore)
  for (const id of Object.keys(existingDataMap)) {
    console.log(`Document with ID: ${id} was removed because it's not in the seed data anymore.`);
  }
}

async function main() {
  // Get backup folder path from command line arguments
  const backupFolder = process.argv[2];
  if (!backupFolder) {
    console.error(chalk.red("Please provide a backup folder path as the first argument."));
    process.exit(1);
  }

  // Ensure the backup folder exists
  if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder, { recursive: true });
  }

  // For debugging, let's first print out connection info of the database just to make sure
  const firestoreConfig = db._settings;

  console.log(chalk.blue("Firestore Connection Info:"));
  console.log(JSON.stringify(firestoreConfig, null, 2));

  if (
    (await prompts({
      type: "confirm",
      name: "value",
      message: "Are you sure you want to proceed?",
      initial: false,
    })).value
  ) {
    console.log(chalk.green("Migration process started..."));
  } else {
    console.log(chalk.yellow("Aborting migration process..."));
    process.exit(0);
  }

  const __filename = import.meta.url.slice("file://".length).slice(process.platform === "win32" ? 1 : 0);
  const __dirname = path.dirname(__filename);

  // Define collection name
  const collectionName = "subjects";

  // Step 1: Backup the current data in the collection
  await backupCollectionData(collectionName, backupFolder);

  // Step 2: Proceed with clearing and reseeding the collection
  await clearCollection(db, collectionName);

  const subjectsDir = path.resolve(__dirname, "..", "seed-data", "subjects");

  console.log(subjectsDir);

  const dataFiles = fs
    .readdirSync(subjectsDir)
    .filter((file) => file.endsWith(".cjs"));

  for (const dataFile of dataFiles) {
    const subjectData = (await import(path.join(subjectsDir, dataFile))).default;
    console.log(`Processing subject: ${dataFile}`);
    console.log(subjectData);
    const subjectId = path.basename(dataFile, ".cjs");
    const subjectName = subjectData.name;
    const subjectBlurb = subjectData.blurb;
    await db.collection("subjects").doc(subjectId).set({
      name: subjectName,
      blurb: subjectBlurb,
      unlisted: subjectData.unlisted,
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
