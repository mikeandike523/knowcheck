/**
 * The functions used to power the "Know/Check" app
 *
 * "Know/Check" is dynamic quiz app that draws it's questions from a database and
 * uses the GPT 4 API to serve as a grader for open ended questions
 *
 * The GPT API is instructed (wiht a context prompt) to use it's general knowledge of the subject matter
 * As well as a list of supporting information unique to the question at hand
 */
import { QuizRegistration } from "./common/api-types";
export declare const listSubjects: () => Promise<{
    name: any;
    blurb: any;
    id: string;
}[]>;
export declare const getSubjectConfig: (args: {
    id: string;
}) => Promise<{
    id: string;
}>;
export declare const registerForQuiz: (args: {
    subjectId: string;
    email: string;
    fullName: string;
    baseUrl: string;
}) => Promise<QuizRegistration>;
export declare const getQuizInstanceData: (args: {
    subjectId: string;
    instanceId: string;
}) => Promise<{
    fullName: any;
    quizName: any;
}>;
//# sourceMappingURL=api.d.ts.map