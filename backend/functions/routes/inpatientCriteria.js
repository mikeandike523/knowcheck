const functions = require("firebase-functions/v2");

const formatError = require("../../utils/formatError.js");
const simulateRPC = require("../../utils/simulateRPC.js");
const SmartFetch = require("../../utils/SmartFetch.js");

const openAIKey = process.env.OPENAI_API_KEY;


const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

async function getNumQuestions() {
  const querySnapshot = await db.collection("inpatient-criteria").get();
  if (querySnapshot.size === 0) {
    throw 'No documents in the "inpatient-criteria" collection';
  }
  return querySnapshot.size;
}

async function getCriteriaDocument(id) {
  const document = await db.collection("inpatient-criteria").doc(id).get();
  if (!document.exists) {
    throw `No document in the "inpatient-criteria" collection with id ${id}`;
  }
  return document.data();
}

async function getCriteriaName(questionNumber) {
  const criteriaDocument = await getCriteriaDocument(questionNumber.toString());

  if (!criteriaDocument.Name) {
    throw 'No "Name" field in the criteria document';
  }

  if (typeof criteriaDocument.Name !== "string") {
    throw 'The "Name" field in the criteria document is not a string';
  }

  return criteriaDocument.Name;
}

async function getCorrectCriteria(questionNumber) {
  const criteriaList = (await getCriteriaDocument(questionNumber.toString())).Criteria;
  if (!criteriaList) {
    throw 'No "Criteria" field in the criteria document';
  }
  if (typeof criteriaList !== "object" || !Array.isArray(criteriaList)) {
    throw 'The "Criteria" field in the criteria document is not an array';
  }
  return criteriaList;
}

module.exports.getNumQuestions = functions.https.onRequest(
  { cors: true },
  (request, response) => {
    simulateRPC(request, response, async (args) => {
      return getNumQuestions();
    });
  }
);

module.exports.getCriteriaName = functions.https.onRequest(
  { cors: true },
  (request, response) => {
    simulateRPC(request, response, async (args) => {
      return getCriteriaName(args.questionNumber);
    });
  }
);

module.exports.getCorrectCriteria = functions.https.onRequest(
  { cors: true },
  (request, response) => {
    simulateRPC(request, response, async (args) => {
      return getCorrectCriteria(args.questionNumber);
    });
  }
);

const contextPrompt = `
You are an assistant that evaluates user submissions in a dynamic quiz web app.
This quiz presents users with a name of a diagnosis, and they must respond with a list of criteria 
that indicate whether a patient should be an taken in as an inpatient under that diagnosis.

The criteria for the diagnosis and inpatient stay will be drawn from our custom database by name,
but you should also use your general knowledge of medicine to inform your response.

You will provide the user a score from 0 to 10, where 0 is a catch-all for malformed input,
1 represents an extremely poor understanding
5 represents an average understanding,
and 10 represents an extremely high understanding.

You will also provide a detailed explanation of why you gave that score.



Your response should follow this format:

Score: <SCORE>

Explanation:

<EXPLANATION>

`;

module.exports.analyzeAnswer = functions.https.onRequest(
  { cors: true },
  (request, response) => {
    simulateRPC(request, response, async (args) => {
      const questionNumber = args.questionNumber;
      const answer = args.answer;

      //placeholders
      const criteriaName = await getCriteriaName(questionNumber);
      const correctCriteria = await getCorrectCriteria(questionNumber);

      const instancePrompt = `
Please evaluate the users reponse:

Diagnosis Name: ${criteriaName}

User Response: ${answer}

Correct Criteria:

${correctCriteria
  .map((criteria, index) => `Criteria #${index + 1}\n${criteria}`)
  .join("\n\n")}
`;

      try {
        const gptResponse = await (new SmartFetch(
          "https://api.openai.com/v1/chat/completions"
        )
          .bearer(openAIKey)
          .post({
            model: "gpt-4-32k",
            messages: [
              {
                role: "system",
                content: contextPrompt,
              },
              {
                role: "user",
                content: instancePrompt,
              },
            ],
            max_tokens: 300, // Increased token count for detailed feedback
          }));

        const gptResponseText = gptResponse.choices[0].message.content
          .replace(/\r\n/g, "\n")
          .trim();

        const contentRegex = /Score: (\d+)\s*\nExplanation:\n(.*?)$/is

        if(!contentRegex.test(gptResponseText)){
          throw `GPT Response in incorrect format:\n\n${gptResponseText}`
        }

        const matchObject = contentRegex.exec(gptResponseText)

        const score = parseInt(matchObject[1])

        const explanation = matchObject[2].trim()

        return {
          score,
          explanation
        }

        
      } catch (e) {
        return {
          score: 0,
          explanation: `There was an error retrieving or processing the OpenAI response:\n${JSON.stringify(
            formatError(e),
            null,
            2
          )}`,
        };
      }
    });
  }
);
