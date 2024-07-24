import { Model } from "../../lib/firestore";

export interface QuestionData {
    subjectId: string;
    body: string;
    supportingInfo: string[]
}

export const QuestionModel = new Model<QuestionData>("questions");
export default QuestionModel;