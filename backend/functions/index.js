const api = import("./api.js");
const functions = require("firebase-functions/v2");

const ASCII_RED = "\u001b[31m";
const ASCII_RESET = "\u001b[0m";
const printStderrRed = (text) => {
  process.stderr.write(`${ASCII_RED}${text}${ASCII_RESET}\n`);
};
const die = (message) => {
  printStderrRed(message);
  process.exit(1);
};

async function getRoute(name) {
  const mod = (await import("./api.js")).default;
  if (typeof mod[name] === "function") {
    return mod[name];
  } else {
    die(`No function named ${name} in api.js`);
  }
}

const createHandler = (routeName) =>
  functions.https.onRequest({ cors: true }, async (req, res) => {
    const callback = await getRoute(routeName);
    const simulateRPC = (await import("./utils/rpc-server.js")).simulateRPC;
    simulateRPC(req, res, callback);
  });

module.exports.listSubjects = createHandler("listSubjects");
module.exports.getSubjectConfig = createHandler("getSubjectConfig");
module.exports.registerForQuiz = createHandler("registerForQuiz");
module.exports.getQuizInstanceData = createHandler("getQuizInstanceData");