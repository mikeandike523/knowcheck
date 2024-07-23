import { QuizQuestionReponse } from "../../common/api-types/handlers/quiz"

export default interface TData extends QuizQuestionReponse {
    instanceId: string;
}