/**
 * The functions used to power the "Know/Check" app
 *
 * "Know/Check" is dynamic quiz app that draws it's questions from a database and
 * uses the GPT 4 API to serve as a grader for open ended questions
 *
 * The GPT API is instructed (wiht a context prompt) to use it's general knowledge of the subject matter
 * As well as a list of supporting information unique to the question at hand
 */
/**
 *
 * Route /listSubjects
 *
 * Lists the subjects throughout all of 'Know/Check' that are not marked as unlisted
 *
 * @param args - empty object {}
 *
 * @returns Array<{
 *  name: string,
 *  blurb: string
 * }>
 *
 * @remarks
 * `args` is expected to be an empty object since on the client side, if an api call takes no arguments,
 * `undefined` is coalesced to empty object `{}` using the nullish coalescing operator `??`
 */
export declare const listSubjects: () => Promise<{
    name: any;
    blurb: any;
    id: string;
}[]>;
/**
 *
 * Route /getSubjectConfig
 *
 * Gets
 *
 * @param args - {
 *  id: string
 * }
 *
 * @returns {
 *   name: string,
 *   blurb: string,
 *   contextPrompt: string,
 *   userPromptTemplate: string,
 *   unlisted: boolean
 * }
 */
export declare const getSubjectConfig: (args: {
    id: string;
}) => Promise<{
    id: string;
}>;
//# sourceMappingURL=api.d.ts.map