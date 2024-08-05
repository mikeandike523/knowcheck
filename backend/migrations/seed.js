import fs from "fs";
import path from "path";

import chalk from "chalk";
import prompts from "prompts";

import { clearCollection } from "../../utils/firestore/collections.js";
import db from "./utils/db.js";

async function main() {
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

  const __filename = import.meta.url.slice("file://".length).slice(process.platform === "win32"? 1 : 0)
  const __dirname = path.dirname(__filename);

  await clearCollection(db, "subjects");
  await clearCollection(db, "questions");

  const subjectsDir = path.resolve(__dirname, "..", "seed-data", "subjects");

  console.log(subjectsDir);

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
