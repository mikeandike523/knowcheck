"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.importUtilsRpc = exports.importUtilsRpcServer = exports.importNodeMailer = void 0;
const cjs_compat_1 = require("../lib/cjs-compat");
const importNodeMailer = (0, cjs_compat_1.createImporter)("nodemailer");
exports.importNodeMailer = importNodeMailer;
const importUtilsRpcServer = (0, cjs_compat_1.createImporter)("./utils/rpc-server.js");
exports.importUtilsRpcServer = importUtilsRpcServer;
const importUtilsRpc = (0, cjs_compat_1.createImporter)("./utils/rpc.js");
exports.importUtilsRpc = importUtilsRpc;
