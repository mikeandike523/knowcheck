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
exports.asyncImport = asyncImport;
exports.asyncImportDefault = asyncImportDefault;
exports.createImporter = createImporter;
exports.createDefaultImporter = createDefaultImporter;
/**
 * Import a javascript module and retrieve an object-like item
 * with all of the non-default exports
 *
 * If the module also has a default export, then it is included
 * but is not intended to be used
 */
async function asyncImport(modulePath) {
    const imported = await Promise.resolve(`${modulePath}`).then(s => __importStar(require(s)));
    return imported;
}
/**
 * Import a javascript module and retrieve the default export
 * Note that this works both for moduels that only have a default export
 * as well as modules that have both a default export and non-default exports
 */
async function asyncImportDefault(modulePath) {
    const imported = await Promise.resolve(`${modulePath}`).then(s => __importStar(require(s)));
    if ("default" in imported) {
        return imported.default;
    }
    else {
        throw new Error(`Module ${modulePath} does not have a default export`);
    }
}
function createImporter(modulePath) {
    return () => {
        return asyncImport(modulePath);
    };
}
function createDefaultImporter(modulePath) {
    return () => {
        return asyncImportDefault(modulePath);
    };
}
