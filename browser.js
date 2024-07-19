import { readFileSync } from "fs";
import puppeteer from "puppeteer";
import fs from 'fs'
import os from 'os'
import path from "path"
import ColorDebug from "./utils/ColorDebug.js"

let globalBrowser = undefined
let globalTd = undefined

const getRandomName = () => {
  return "test-browser-storage-dir-" + (new Array(20).fill(0).map((i) => {
    const chars = "0123456789"
    return chars[Math.floor(Math.random() * (chars.length))]
  }).join(''))
}

function getMessage(e) {
  if (e instanceof Error) {
    return e.message
  }
  return e.toString()
}

async function getCurrentPage(browser) {
  const targets = browser.targets();
  for (let i = 0, I = targets.length; i < I; ++i) {
    const target = targets[i];
    const page = await target.page();
    if (page) {
      return page;
    }
  }
  return null;
}

const urls = JSON.parse(readFileSync("browser.json", "utf-8")).urls;

const env = process.env.NODE_ENV || "development";

if (!["development", "production"].includes(env)) {
  console.error(
    'Invalid environment type. Choose "development" or "production".'
  );
  process.exit(1);
}

const url = urls[env];

async function main() {

  const tempdirPath = os.tmpdir()

  let td = path.join(tempdirPath, getRandomName())

  while (fs.existsSync(td)) {
    td = path.join(tempdirPath, getRandomName())
  }

  ColorDebug.ansi().info(`Creating temporary directory "${td}"...`, {
    textColor: "blue"
  })

  fs.mkdirSync(td)

  globalTd = td

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: td,
    args: ["--start-maximized"],
    ignoreHTTPSErrors:true,
    defaultViewport: null,
  });

  globalBrowser = browser;

  const page = await getCurrentPage(browser)

  try {
    console.log(`Navigating to ${url}...`);
    await page.goto(url);
  } catch (e) {
    ColorDebug.ansi().error("Could not navigate to page: " + getMessage(e), {
      textColor: "red"
    })

    try {
      await browser.close()
    } catch (e) {
      ColorDebug.ansi().error("Lost control of puppeteer browser", {
        "textColor": "red"
      })
      throw e
    }
  }
}

function onExitCommon() {
  if (globalTd) {
    try {
      ColorDebug.ansi().info(`Removing temporary directory "${globalTd}"...`, {
        textColor: "blue"
      })
      fs.rmdirSync(globalTd, {
        recursive: true,
        force: true
      })
    } catch (e) {
      ColorDebug.ansi().warn(`! WARNING ! Could not remove temporary directory "${globalTd}": ` + getMessage(e), {
        textColor: "yellow"
      })
    }
  }

}

function onExitSigint() {
  ColorDebug.ansi().info("Detected CTRL+C (SIGINT), exiting gracefully...", {
    textColor: "blue"
  })

  if (globalBrowser) {
    ColorDebug.ansi().info("Closing browser...", {
      textColor: "blue"
    })
    globalBrowser.close()
      .catch(e => {

        ColorDebug.ansi().error("Lost control of puppeteer browser", {
          "textColor": "red"
        })

      })
  }
}

process.on('exit', onExitCommon);
process.on('SIGINT', onExitSigint);

try {
  await main()
} catch (e) {
  ColorDebug.ansi().error(`Main process failed: ` + getMessage(e), {
    textColor: "red"
  })
}



