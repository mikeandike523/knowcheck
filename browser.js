// launch.js
import { readFileSync } from "fs";
import puppeteer from "puppeteer";
import tmp from "tmp";



const tmpDir = tmp.dirSync();

// Read URLs from browser.json
const urls = JSON.parse(readFileSync("browser.json", "utf-8")).urls;

const env = process.env.NODE_ENV || "development";

// Validate environment type
if (!["development", "production"].includes(env)) {
  console.error(
    'Invalid environment type. Choose "development" or "production".'
  );
  process.exit(1);
}

// Get the URL for the specified environment
const url = urls[env];

async function main() {
  // Launch Puppeteer
const browser = await puppeteer.launch({
  headless: false, // Set to true if you want headless mode
  userDataDir: tmpDir.name, // Change path if needed
  args: ["--start-maximized"], // Uncomment to start browser in maximized mode
  defaultViewport: null,
});

// Open a new page
const page = await browser.newPage();

// Navigate to the URL
await page.goto(url);

console.log(`Launched browser in ${env} mode and navigated to ${url}`);

}

// todo -- register on signal ctrl+c kill but first clean up the tempdir

await main();



