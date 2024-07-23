import * as typesQuizActionsLoadNextQuest from "../handlers/quizActions/loadNextQuestion";
import * as typesQuizActionsSubmitAnswer from "../handlers/quizActions/submitAnswer";


export type QuizQuestionReponse = {
    questionId: string;
    questionText: string;
    submission: string;
    gptScore: number;
    gptExplanation: string;
}

export type QuizEndpointArg = typesQuizActionsLoadNextQuest.TArgs | typesQuizActionsSubmitAnswer.TArgs;
export type QuizEndpointReturn = typesQuizActionsLoadNextQuest.TReturn | typesQuizActionsSubmitAnswer.TReturn;

