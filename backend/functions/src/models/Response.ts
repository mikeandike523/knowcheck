import { QuizQuestionReponse } from "../../common/api-types/handlers/quiz"
import { Model } from "../../lib/firestore";

export interface ResponseData extends QuizQuestionReponse {
    instanceId: string;
}

export const ResponseModel = new Model<ResponseData>("responses");
export default ResponseModel