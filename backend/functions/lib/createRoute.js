"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRoute;
const functions = __importStar(require("firebase-functions/v2"));
// Dynamic import wrappers commonly used throughout this project
// provided primarily to facilitiy ease CommonJS compatibility
// which is required for firebase functions at this time
const importers_1 = require("../src/importers");
/**
 * Given an RPC-style handler, wrap it with the necessary code
 * to define a firebase function
 * @param routeName
 * @param handler
 * @returns
 *
 * @remarks
 * Unfortuantely, due to firebase functions needing CommonJS, it is necessary
 * to dynamically import code each time the function is run
 *
 * @todo Look into ways to cache dynamic imports in firebase functions
 *
 */
function createRoute(routeName, handler) {
    return functions.https.onRequest(async (request, response) => {
        const { simulateRPC } = await (0, importers_1.importUtilsRpcServer)();
        simulateRPC(request, response, handler, routeName);
    });
}
