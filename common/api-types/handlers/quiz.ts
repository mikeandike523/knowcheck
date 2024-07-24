import * as typesQuizActionsLoadNextQuestion from "../handlers/quizActions/loadNextQuestion";
import * as typesQuizActionsSubmitAnswer from "../handlers/quizActions/submitAnswer";
import { Action } from "../../validators/handlers/quiz";


export type QuizQuestionReponse = {
    questionId: string;
    questionText: string;
    answer: string;
    gptScore: number;
    gptExplanation: string;
}



export type QuizApiPayloadMapping = {
    "loadNextQuestion": typesQuizActionsLoadNextQuestion.TArgs;
    "submitAnswer": typesQuizActionsSubmitAnswer.TArgs;
}
export type QuizApiReturnMapping = {
    "loadNextQuestion": typesQuizActionsLoadNextQuestion.TReturn;
    "submitAnswer": typesQuizActionsSubmitAnswer.TReturn;
}

export type QuizEndpointArg = QuizApiPayloadMapping[Action];
export type QuizEndpointReturn = QuizApiReturnMapping[Action];

