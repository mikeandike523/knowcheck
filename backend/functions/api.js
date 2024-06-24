/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./functions/api.ts":
/*!**************************!*\
  !*** ./functions/api.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getSubjectConfig = exports.listSubjects = void 0;\nconst rpc_js_1 = __webpack_require__(/*! ../utils/rpc.js */ \"../utils/rpc.js\");\nconst rpc_server_js_1 = __webpack_require__(/*! ../utils/rpc-server.js */ \"../utils/rpc-server.js\");\nconst firebase_admin_1 = __importDefault(__webpack_require__(/*! firebase-admin */ \"firebase-admin\"));\nconst v2_1 = __webpack_require__(/*! firebase-functions/v2 */ \"firebase-functions/v2\");\nfirebase_admin_1.default.initializeApp();\nconst db = firebase_admin_1.default.firestore();\nexports.listSubjects = (0, rpc_server_js_1.createRPCHandler)(() => __awaiter(void 0, void 0, void 0, function* () {\n    const subjects = yield db.collection(\"subjects\").where(\"unlisted\", \"==\", false).get();\n    v2_1.logger.write({\n        severity: \"DEBUG\",\n        data: subjects.docs\n    });\n    return subjects.docs.map((doc) => {\n        return {\n            name: doc.data().name,\n            blurb: doc.data().blurb,\n            id: doc.id\n        };\n    });\n}));\nexports.getSubjectConfig = (0, rpc_server_js_1.createRPCHandler)((args) => __awaiter(void 0, void 0, void 0, function* () {\n    const subjectId = args.id;\n    const subjectConfig = yield db.collection(\"subjects\").doc(subjectId).get();\n    if (!subjectConfig.exists) {\n        throw yield (0, rpc_server_js_1.fileError)(\"/getSubjectConfig\", (ticketNumber) => {\n            return rpc_js_1.TypicalRPCErrors.InvalidAPIInputError(`No subject with id ${subjectId}`, ticketNumber);\n        });\n    }\n    const data = subjectConfig.data();\n    if (typeof data === \"undefined\") {\n        throw yield (0, rpc_server_js_1.fileError)(\"/getSubjectConfig\", (ticketNumber) => {\n            return rpc_js_1.TypicalRPCErrors.MissingDataError(`The data for subject ${subjectId} may be missing`, ticketNumber);\n        });\n    }\n    return Object.assign({ id: subjectId }, data);\n}));\n\n\n//# sourceURL=webpack:///./functions/api.ts?");

/***/ }),

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("firebase-admin");

/***/ }),

/***/ "firebase-functions/v2":
/*!****************************************!*\
  !*** external "firebase-functions/v2" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("firebase-functions/v2");

/***/ }),

/***/ "../utils/dedent.js":
/*!**************************!*\
  !*** ../utils/dedent.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction commonPrefix(strings) {\n  const minLength = Math.min(...strings.map((s) => s.length));\n  for (let i = 0; i < minLength; i++) {\n    if (strings[0][i]!== strings[1][i]) {\n      return strings[0].slice(0, i);\n    }\n  }\n  return strings[0].slice(0, minLength);\n}\nfunction captureLeadingWhitespace(line) {\n  const leadingWhitespace = line.match(/^\\s*/)[0];\n  return {\n    leadingWhitespace,\n    remaining: line.slice(leadingWhitespace.length),\n  };\n}\n\n/**\n * A highly flexible dedent algorithm\n *\n * Note, this algorithm does not remove any leading or trailing blank lines\n * This is because we do not want to introduce unexpected behavior,\n * even though the vast majority of the time the user will call trim() anyway\n *\n * @param {string} text - the text to dedent\n */\nfunction dedent(text) {\n  if(Array.isArray(text)) {\n    text=text.join(\"\")\n  }\n  console.log(text)\n  const normalized = text.replace(/\\r\\n/g, \"\\n\");\n  const lines = normalized.split(\"\\n\");\n  const nonBlankOrAllWhitespaceLines = lines.filter(\n    (line) => line.trim().length > 0,\n  );\n  if (nonBlankOrAllWhitespaceLines.length === 0) {\n    return normalized;\n  }\n  // This should also handle the edge case gracefully\n  // Where there is only one line with some leading whitespace, and no other significant lines\n  const leadingWhitespaceData = nonBlankOrAllWhitespaceLines.map((line) =>\n    captureLeadingWhitespace(line),\n  );\n  // Clever solution -- use an existing common prefix algorithm\n  // These algorithms are usually used for thigns such as filepath analysis, but it is also useful to detect common indentation\n\n  const leadingWhitespaces = leadingWhitespaceData.map(\n    (data) => data.leadingWhitespace,\n  );\n  const commonPrefixWhitespace = commonPrefix(leadingWhitespaces);\n\n  const dedentedLines = lines.map((line) => {\n    if (line.trim().length === 0) {\n      return line;\n    }\n    return line.slice(commonPrefixWhitespace.length);\n  });\n\n  return dedentedLines.join(\"\\n\");\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dedent);\n\n//# sourceURL=webpack:///../utils/dedent.js?");

/***/ }),

/***/ "../utils/dedentTrim.js":
/*!******************************!*\
  !*** ../utils/dedentTrim.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dedent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dedent.js */ \"../utils/dedent.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(text) {\n  console.log(text)\n  return (0,_dedent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(text).trim();\n};\n\n\n//# sourceURL=webpack:///../utils/dedentTrim.js?");

/***/ }),

/***/ "../utils/formatError.js":
/*!*******************************!*\
  !*** ../utils/formatError.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// !! copy-to-frontend\n\nfunction formatError(e) {\n  const visited = new Set();\n  const recursion = (e1) => {\n    if (typeof e1 === \"undefined\") {\n      return null;\n    }\n    if (e1 === null) {\n      return null;\n    }\n    if ([\"string\", \"number\", \"boolean\"].includes(typeof e1)) {\n      return e1;\n    }\n    if (typeof e1 === \"object\") {\n      if (visited.has(e1)) {\n        return null;\n      }\n      visited.add(e1);\n      if (Array.isArray(e1)) {\n        return e1.map((item) => {\n          return recursion(item);\n        });\n      } else {\n        const result = {};\n        const keys = Object.getOwnPropertyNames(e1);\n        keys.forEach((keyName) => {\n          result[keyName] = recursion(e1[keyName]);\n        });\n        return result;\n      }\n    }\n    return e1.toString();\n  };\n  return recursion(e);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatError);\n\n//# sourceURL=webpack:///../utils/formatError.js?");

/***/ }),

/***/ "../utils/indent.js":
/*!**************************!*\
  !*** ../utils/indent.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(text, indent = 2) {\n  const indentString = typeof indent === \"number\" ? \" \".repeat(indent) : indent;\n  const normalized = text.replace(/\\r\\n/g, \"\\n\");\n  const lines = normalized.split(\"\\n\");\n  return lines.map((line) => indentString + line).join(\"\\n\");\n};\n\n\n//# sourceURL=webpack:///../utils/indent.js?");

/***/ }),

/***/ "../utils/rpc-server.js":
/*!******************************!*\
  !*** ../utils/rpc-server.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createRPCHandler: () => (/* binding */ createRPCHandler),\n/* harmony export */   fileError: () => (/* binding */ fileError),\n/* harmony export */   simulateRPC: () => (/* binding */ simulateRPC)\n/* harmony export */ });\n/* harmony import */ var _rpc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rpc.js */ \"../utils/rpc.js\");\n/* harmony import */ var firebase_functions_v2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase-functions/v2 */ \"firebase-functions/v2\");\n\n\n\n\n/**\n * @param {*} route - The requested route / firebase function\n * @param {*} error - 1. An RPCError object\n *\n *                       OR\n * \n *                    2. A (sync) callback that when given a ticket number constructs the error\n *                            (which in some cases may involve\n *                            simply passing a reference to an existing error object)\n *\n * @returns {Promise<RPCError>} A reference to the original error (potentially generated from a callback)\n */\nasync function fileError(route, error) {\n\n    const TICKET_NUMBER_LENGTH = 15\n\n    // Step 1: Generate a unique ticket number (15 digits numeric string)\n    const generateTicketNumber = () => {\n      let ticketNumber = \"\";\n      const digits = \"0123456789\";\n      for (let i = 0; i < TICKET_NUMBER_LENGTH; i++) {\n        ticketNumber += digits.charAt(Math.floor(Math.random() * digits.length));\n      }\n      return ticketNumber;\n    };\n  \n    const ticketNumber = generateTicketNumber();\n  \n    // Step 2: Construct the error if it's a function, otherwise assume it's an RPCError\n    const constructError =\n      typeof error === \"function\" ? error(ticketNumber) : error;\n  \n    // Step 3: Ensure the error is wrapped in an RPCError\n    const rpcError = _rpc_js__WEBPACK_IMPORTED_MODULE_0__.RPCError.wrap(constructError);\n  \n    // Step 4: Convert the error to JSON\n    const errorData = rpcError.toJSON();\n  \n    // Step 5: Add the route and ticket number to the error data\n    errorData.route = route;\n    errorData.ticketNumber = ticketNumber;\n  \n    await firebase_functions_v2__WEBPACK_IMPORTED_MODULE_1__.logger.write({severity:\"ERROR\",...errorData});\n  \n    // Step 7: Return the original error for \"rethrow\"\n    return rpcError;\n  }\n\nasync function simulateRPC(request, response, callback, routeName = \"\") {\n    const args = request.body; // Auto-parsed\n    try {\n      let resultOrPromise = callback(args);\n      if (resultOrPromise instanceof Promise) {\n        resultOrPromise = await resultOrPromise;\n      }\n      response.status(200).json(resultOrPromise);\n    } catch (e) {\n      if (_rpc_js__WEBPACK_IMPORTED_MODULE_0__.RPCError.isLike(e)) {\n        response.status(e.status).json(e);\n      } else {\n        response.status(500).json(\n          await fileError(routeName, (ticketNumber) => {\n            return _rpc_js__WEBPACK_IMPORTED_MODULE_0__.TypicalRPCErrors.UnknownServerError(e, ticketNumber);\n          }),\n        );\n      }\n    }\n  }\n  async function createRPCHandler(callback, routeName = \"\") {\n    return firebase_functions_v2__WEBPACK_IMPORTED_MODULE_1__.https.onRequest({ cors: true }, (request, response) => {\n      simulateRPC(request, response, callback, routeName);\n    });\n  }\n  \n  \n\n\n\n//# sourceURL=webpack:///../utils/rpc-server.js?");

/***/ }),

/***/ "../utils/rpc.js":
/*!***********************!*\
  !*** ../utils/rpc.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RPCError: () => (/* binding */ RPCError),\n/* harmony export */   TyipcalUserFacingErrorMessages: () => (/* binding */ TyipcalUserFacingErrorMessages),\n/* harmony export */   TypicalRPCErrors: () => (/* binding */ TypicalRPCErrors)\n/* harmony export */ });\n/* harmony import */ var _formatError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatError.js */ \"../utils/formatError.js\");\n/* harmony import */ var _dedentTrim_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dedentTrim.js */ \"../utils/dedentTrim.js\");\n/* harmony import */ var _indent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indent.js */ \"../utils/indent.js\");\n/* harmony import */ var _string_templating_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./string-templating.js */ \"../utils/string-templating.js\");\n\nconst formatError = _formatError_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\nconst dedentTrim = _dedentTrim_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\nconsole.log(dedentTrim)\n\n\n;\nconst indent = _indent_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n\nconst fillTemplate = _string_templating_js__WEBPACK_IMPORTED_MODULE_3__.fillTemplate;\nconst escapeForTemplate = _string_templating_js__WEBPACK_IMPORTED_MODULE_3__.escapeForTemplate;\n\nclass RPCError extends Error {\n  static buildMessage({\n    status,\n    logMessage,\n    cause = undefined,\n    userFacingMessage = undefined,\n  }) {\n    return dedentTrim`\nRPCError:\n       \nStatus: ${status}\n\nLog Message:\n${logMessage}\n\nUser Facing Message:\n${userFacingMessage}\n\nCause:\n${typeof cause === \"undefined\" ? \"undefined\" : JSON.stringify(formatError(cause), null, 2)}\n\n    `;\n  }\n\n  constructor({\n    status,\n    logMessage,\n    cause = undefined,\n    userFacingMessage = undefined,\n  }) {\n    super(\n      RPCError.buildMessage({\n        status,\n        logMessage,\n        cause,\n        userFacingMessage,\n      }),\n    );\n    this.logMessage = logMessage;\n    this.name = \"RPCError\";\n    this.status = status;\n    this.cause = formatError(cause);\n    this.userFacingMessage = userFacingMessage;\n  }\n\n  isUserFacing() {\n    return typeof this.userFacingMessage === \"string\";\n  }\n\n  getLogMessage() {\n    return this.logMessage;\n  }\n\n  getUserFacingMessage() {\n    return this.userFacingMessage;\n  }\n\n  toJSON() {\n    return {\n      message: this.message,\n      logMessage: this.logMessage,\n      status: this.status,\n      cause: this.cause,\n      userFacingMessage: this.userFacingMessage,\n      isUserFacing: this.isUserFacing(),\n    };\n  }\n\n  toString() {\n    return this.message;\n  }\n\n  static is(obj) {\n    return obj instanceof RPCError;\n  }\n  static isLike(obj) {\n    // Oversimplified but will only improve it if needed\n    return (\n      RPCError.is(obj) || (typeof obj === \"object\" && obj.name === \"RPCError\")\n    );\n  }\n  static wrap(obj, status = 5000) {\n    if (RPCError.isLike(obj)) {\n      return obj;\n    }\n    return new RPCError({\n      status,\n      logMessage: \"Internal Server Error\",\n      cause: obj,\n    });\n  }\n}\n\nclass TyipcalUserFacingErrorMessages extends Error {\n  static GeneralServerError(explanation, ticketNumber) {\n    const template = dedentTrim`\n\n        A system error has occurred:\n\n        :+\n\n        Please try again later.\n\n        You can also file a bug report if the problem persists.\n        ${escapeForTemplate(process.env.BUG_REPORT_URL)}\n\n        For pressing issues, contact ${escapeForTemplate(process.env.SUPPORT_EMAIL)}\n\n        Ticket #: ${escapeForTemplate(ticketNumber)}\n        `;\n    return fillTemplate(template, [indent(explanation, 4)]);\n  }\n}\n\nclass TypicalRPCErrors {\n  static InvalidAPIInputError(cause, ticketNumber) {\n    return new RPCError({\n      cause,\n      status: 400,\n      logMessage: `Invalid input to API`,\n      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(\n        `Invalid API Request`,\n        ticketNumber,\n      ),\n    });\n  }\n\n  static APIRouteNotFoundError(cause, ticketNumber) {\n    return new RPCError({\n      cause,\n      status: 404,\n      logMessage: `API Route Not Found`,\n      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(\n        `The client made a request to a non-existent API route`,\n        ticketNumber,\n      ),\n    });\n  }\n  static ThirdPartyConnectionError(service, cause, ticketNumber) {\n    return new RPCError({\n      cause,\n      status: 500,\n      logMessage: `Failure to connect to third party service: ${service}`,\n      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(\n        \"The application server is experiencing a network error\",\n        ticketNumber,\n      ),\n    });\n  }\n\n  static UnknownServerError(cause, ticketNumber) {\n    return new RPCError({\n      cause,\n      status: 500,\n      logMessage: `Unknown Server Error`,\n      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(\n        \"Unknown Error\",\n        ticketNumber,\n      ),\n    });\n  }\n\n  static MissingDataError(cause, ticketNumber) {\n    return new RPCError({\n      cause,\n      status: 500,\n      logMessage: `Missing Data`,\n      userFacingMessage: TyipcalUserFacingErrorMessages.GeneralServerError(\n        \"Some requested data is missing.\",\n        ticketNumber,\n      ),\n    });\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///../utils/rpc.js?");

/***/ }),

/***/ "../utils/string-templating.js":
/*!*************************************!*\
  !*** ../utils/string-templating.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   escapeForTemplate: () => (/* binding */ escapeForTemplate),\n/* harmony export */   fillTemplate: () => (/* binding */ fillTemplate)\n/* harmony export */ });\n/**\n *\n * Super easy template formatting using syntax\n *\n * :name    named indices, only works if data is an object\n * :index   specific indices, only works if data is an array\n * :+       indices in order only works if data is an array\n * ::       escapes colon\n *\n * :!   !:   specialized escape sequence to never process inside a given region\n *           of course the region delimiters are removed\n *           i.e. \"raw\" indicator\n *\n *\n * @param {*} template\n * @param {*} data\n */\nfunction fillTemplate(template, data) {\n  let orderIndex = 0;\n\n  // Handle the raw regions first\n  let rawRegions = [];\n  template = template.replace(/:!(.*?)!:/gs, (match, p1) => {\n    rawRegions.push(p1);\n    return `__RAW${rawRegions.length - 1}__`;\n  });\n\n  // Process the template\n  template = template.replace(/:(\\+|::|\\w+)/g, (match, p1) => {\n    if (p1 === \"::\") {\n      return \":\";\n    } else if (p1 === \"+\") {\n      if (Array.isArray(data)) {\n        return data[orderIndex++];\n      } else {\n        throw new Error(\"Data must be an array when using :+ syntax\");\n      }\n    } else if (!isNaN(p1)) {\n      if (Array.isArray(data)) {\n        return data[parseInt(p1, 10)];\n      } else {\n        throw new Error(\"Data must be an array when using :index syntax\");\n      }\n    } else {\n      if (typeof data === \"object\" && data !== null) {\n        return data[p1];\n      } else {\n        throw new Error(\"Data must be an object when using :name syntax\");\n      }\n    }\n  });\n\n  // Restore the raw regions\n  template = template.replace(\n    /__RAW(\\d+)__/g,\n    (match, p1) => rawRegions[parseInt(p1, 10)],\n  );\n\n  return template;\n}\n\nfunction escapeForTemplate(text) {\n  if (typeof text !== \"string\") {\n    return text;\n  }\n  return text.replace(/:/g, \"::\");\n}\n\n\n\n//# sourceURL=webpack:///../utils/string-templating.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./functions/api.ts");
/******/ 	var __webpack_export_target__ = this;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;