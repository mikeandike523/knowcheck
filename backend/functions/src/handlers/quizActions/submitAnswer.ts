import { Firestore } from "firebase-admin/firestore";

import {
  TArgs,
  TReturn,
  argsSchema,
} from "../../../common/api-types/handlers/quizActions/submitAnswer";
import CookieEngine from "../../../utils/CookieEngine";
import { parseObjectSchema } from "../../../utils/input-validation";
import protect from "../../lib/protect";
import QuestionModel from "../../models/Question";
import SubjectModel from "../../models/Subject";
import { SmartFetch } from "../../../utils/SmartFetch";
import { TypicalRPCErrors } from "../../../utils/rpc";
import { fileError } from "../../../utils/rpc-server";
import { ResponseData } from "../../models/Response";

const contextPromptTemplate = `
Know/Check is a dynamic quiz application for students in medicine.

You will be tasked with scoring user's answers based on your general knowledge of medicine
as well as a list of pre-determined supporting evidence.

Here is specific info on the specific quiz the user is currently taking:

    Quiz Name: [QUIZ_NAME]
    Quiz Description: "[QUIZ_BLURB]"

You will provide a score of 1 to 10, focusing on quality, completeness, and accuracy
You will also provide a short explanation for your score

Use the following format precisely:

Score:
<SCORE>

Explanation:
<EXPLANATION>
`;
const userPromptTemplate = `
Question Text:
[QUESTION_BODY]

User Response:
[USER_RESPONSE]

Supporting Evidence:
[SUPPORTING_INFO]
`;

export default function createHandlerSubmitAnswer(db: Firestore) {
  return async function (
    args: TArgs,
    cookieEngine: CookieEngine
  ): Promise<TReturn> {
    const claims = await protect({
      instanceId: args.instanceId,
      db,
      cookieEngine,
    });

    const question = (
      await QuestionModel.connect(db).getOne(args.questionId)
    ).unwrap();
    const subjectId = question.subjectId;
    const subject = (await SubjectModel.connect(db).getOne(subjectId)).unwrap();
    const contextPrompt = contextPromptTemplate
      .replace(/\[QUIZ_NAME\]/g, subject.name)
      .replace(/\[QUIZ_BLURB\]/g, subject.blurb);

    const userPrompt = userPromptTemplate
      .replace(/\[QUESTION_BODY\]/g, question.body)
      .replace(/\[USER_RESPONSE\]/g, args.answer)
      .replace(
        /\[CRITERIA_LIST\]/g,
        question.supportingInfo
          .map((item, index) => {
            return `${index + 1}.\n\n${item}`;
          })
          .join("\n\n")
      );

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    if (!OPENAI_API_KEY) {
      throw await fileError("/quiz/submitAnswer", (ticketNumber: string) =>
        TypicalRPCErrors.MissingDataError(
          "Missing environment variable OPENAI_API_KEY",
          ticketNumber
        )
      );
    }

    let gptResponse:
      | {
          choices: Array<{
            message: {
              content: string;
            };
          }>;
        }
      | undefined = undefined;

    try {
      gptResponse = await new SmartFetch(OPENAI_URL)
        .bearer(OPENAI_API_KEY)
        .post({
          model: "gpt-4-32k",
          messages: [
            {
              role: "system",
              content: contextPrompt,
            },
            {
              role: "user",
              content: userPrompt,
            },
          ],
          max_tokens: 300, // Increased token count for detailed feedback
        });
    } catch (e) {
      throw await fileError("/quiz/submitAnswer", (ticketNumber: string) =>
        TypicalRPCErrors.ThirdPartyConnectionError(
          "",
          "Failed to connect to OpenAI API",
          ticketNumber
        )
      );
    }

    if (!gptResponse) {
      throw await fileError("/quiz/submitAnswer", (ticketNumber: string) =>
        TypicalRPCErrors.ThirdPartyInvalidResponse(
          OPENAI_URL,
          "Received an empty or no response from OpenAI API",
          ticketNumber
        )
      );
    }

    if (
      !gptResponse.choices ||
      !Array.isArray(gptResponse.choices) ||
      gptResponse.choices.length === 0
    ) {
      throw await fileError("/quiz/submitAnswer", (ticketNumber: string) =>
        TypicalRPCErrors.ThirdPartyInvalidResponse(
          OPENAI_URL,
          "Received an incomplete or empty response from OpenAI API",
          ticketNumber
        )
      );
    }

    const gptChoice = gptResponse.choices[0];

    if (
      !gptChoice.message ||
      !gptChoice.message.content ||
      typeof gptChoice.message.content !== "string"
    ) {
      throw await fileError("/quiz/submitAnswer", (ticketNumber: string) =>
        TypicalRPCErrors.ThirdPartyInvalidResponse(
          OPENAI_URL,
          "Response from openAI API in incorrect format. OpenAI API response:\n" +
            JSON.stringify(gptResponse, null, 2),
          ticketNumber
        )
      );
    }

    const messageContent = gptChoice.message.content.trim();
    const lines = messageContent.split("\n");
    const scoreLine = lines.findIndex((line) =>
      line.toLowerCase().startsWith("score:")
    );
    if (scoreLine === -1) {
      throw await fileError("/quiz/submitAnswer", (ticketNumber: string) =>
        TypicalRPCErrors.GenerativeAIFailure(
          "No score found in the OpenAI API response. OpenAI API response:\n" +
            JSON.stringify(gptResponse, null, 2),
          ticketNumber
        )
      );
    }
    if (scoreLine >= lines.length - 1) {
      throw await fileError("/quiz/submitAnswer", (ticketNumber: string) =>
        TypicalRPCErrors.GenerativeAIFailure(
          'Cannot find score, there is no content after the line containing the text "Score:". OpenAI response:\n' +
            JSON.stringify(gptResponse, null, 2),
          ticketNumber
        )
      );
    }

    const scoreNumberLine = lines[scoreLine + 1].trim();
    if (!scoreNumberLine) {
      throw await fileError("/quiz/submitAnswer", (ticketNumber: string) =>
        TypicalRPCErrors.GenerativeAIFailure(
          "Cannot find score, the line that should contain the score is empty. OpenAI response:\n" +
            JSON.stringify(gptResponse, null, 2),
          ticketNumber
        )
      );
    }

    const score = parseFloat(scoreNumberLine);

    if (isNaN(score)) {
      throw await fileError("/quiz/submitAnswer", (ticketNumber: string) =>
        TypicalRPCErrors.GenerativeAIFailure(
          "Cannot parse the score from the OpenAI API response. OpenAI response:\n" +
            JSON.stringify(gptResponse, null, 2),
          ticketNumber
        )
      );
    }

    const explanationLine = lines.findIndex((line) =>
      line.toLowerCase().startsWith("explanation:")
    );

    if (explanationLine === -1) {
      throw await fileError("/quiz/submitAnswer", (ticketNumber: string) =>
        TypicalRPCErrors.GenerativeAIFailure(
          "No explanation found in the OpenAI API response. OpenAI response:\n" +
            JSON.stringify(gptResponse, null, 2),
          ticketNumber
        )
      );
    }

    if (explanationLine >= lines.length - 1) {
      throw await fileError("/quiz/submitAnswer", (ticketNumber: string) =>
        TypicalRPCErrors.GenerativeAIFailure(
          'Cannot find explanation, there is no content after the line containing the text "Explanation:". OpenAI response:\n' +
            JSON.stringify(gptResponse, null, 2),
          ticketNumber
        )
      );
    }

    const explanationLineIndexStartInclusive = explanationLine + 1;
    const explanationLines = lines.slice(
      explanationLineIndexStartInclusive,
      lines.length
    );
    const explanation = explanationLines.join("\n").trim();

    const submissionEntry: ResponseData = {
      instanceId: args.instanceId,
      questionId: args.questionId,
      answer: args.answer,
      gptScore: score,
      gptExplanation: explanation,
      questionText: question.body,
      supportingInfo: question.supportingInfo,
    };

    await db.collection("responses").doc().set(submissionEntry);

    return {
      gptScore: score,
      gptExplanation: explanation,
      supportingInfo: question.supportingInfo,
    };
  };
}
