import fs from "fs"
import path from "path"
import repl from 'repl'

import initialize from "../../utils/firebase/initialize.js"
import ColorDebug from "../../utils/ColorDebug.js"

const __filename = import.meta.url
  .slice("file://".length)
  .slice(process.platform === "win32" ? 1 : 0);
const __dirname = path.dirname(__filename);

const db =
  process.env.NODE_ENV === "production"
    ? initialize(
        JSON.parse(
          fs.readFileSync(
            path.resolve(__dirname, "../service-account-key.json")
          )
        )
      ).db
    : initialize(
        undefined,
        false,
        true
    ).db

ColorDebug.ansi().info(
    "Database Setttings:\n" + JSON.stringify(db._settings, null, 2)
)
// Start a REPL instance with the predefined object and await support
const myRepl = repl.start({
    prompt: '> ',
    useGlobal: true,
    useStrict: true,
    ignoreUndefined: true
});

myRepl.context.db = db