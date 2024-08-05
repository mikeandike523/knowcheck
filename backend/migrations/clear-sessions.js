
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

  await clearCollection(db,"__sessions")
}

await main();
