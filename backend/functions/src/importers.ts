/**
 * A collection of dynamic importers used commonly throuhgout this project
 * This project, due to commonjs requirements, heavily depends on dynamic importers
 * 
 * Unfortunately this means that many firebase functions need to load
 * code at runtime, however I can look into caching mechanisms in the future
 * 
 * This is just the unforuntate nature of using commonjs
 * in the age of ecmascript modules and typescript
 */

import { createImporter } from "../lib/cjs-compat";

import * as ModuleNodemailer from "nodemailer";
import * as ModuleUtilsRpcServer from "../utils/rpc-server.d";
import * as ModuleUtilsRpc from "../utils/rpc.d";

const importNodeMailer = createImporter<typeof ModuleNodemailer>("nodemailer");
const importUtilsRpcServer = createImporter<typeof ModuleUtilsRpcServer>(
  "./utils/rpc-server.js"
);
const importUtilsRpc = createImporter<typeof ModuleUtilsRpc>(
  "./utils/rpc.js"
);

export {
    importNodeMailer,
    importUtilsRpcServer,
    importUtilsRpc,
}

