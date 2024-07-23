import * as typesQuizActionsLoadNextQuest from "../handlers/quizActions/loadNextQuestion";
import * as typesQuizActionsSubmitAnswer from "../handlers/quizActions/submitAnswer";
import { Action } from "../../validators/handlers/quiz";


export type QuizQuestionReponse = {
    questionId: string;
    questionText: string;
    submission: string;
    gptScore: number;
    gptExplanation: string;
}



export type QuizApiPayloadMapping = {
    "loadNextQuestion": typesQuizActionsLoadNextQuest.TArgs;
    "submitAnswer": typesQuizActionsSubmitAnswer.TArgs;
}
export type QuizApiReturnMapping = {
    "loadNextQuestion": typesQuizActionsLoadNextQuest.TReturn;
    "submitAnswer": typesQuizActionsSubmitAnswer.TReturn;
}

export type QuizEndpointArg = QuizApiPayloadMapping[Action];
export type QuizEndpointReturn = QuizApiReturnMapping[Action];

