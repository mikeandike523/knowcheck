
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

  const registrations = (await db.collection("registrations").get()).docs
  const emails = new Set()
  for(const registration of registrations) {
    emails.add(registration.data().email);
  }
  const emailsArray = Array.from(emails)
  for(const email of emailsArray) {
    const entriesForEmail = await db.collection("registrations").where("email", "==", email).get();
    // get the one with largest time
    const largestEntry = entriesForEmail.docs.reduce((prev, current) => current.data().time > prev.data().time? current : prev, entriesForEmail.docs[0]);
    console.log(largestEntry.id, largestEntry.data());
    delete all registrations where email is email but id is not largestEntry.id
    const batch = db.batch();
    entriesForEmail.docs.forEach((doc) => {
      if(doc.id!== largestEntry.id) {
        batch.delete(doc.ref);
      }
    });
    await batch.commit();
}
}

await main();
