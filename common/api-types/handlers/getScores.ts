import { TSchema } from "../../validators/handlers/getScores";
import { QuizQuestionReponse } from "./quiz";


export type TArgs = TSchema



/**
 * A subset of information about the user's response used to populate the initial user interface
 * Details about the response can be retrieved via `responseId`
 * 
 * @remarks
 * The goal is that a user will click on a preview to see the full response details, which will need to be fetched on request
 * from a different router
 * (this route is "/getScores" and the route to fetch the details for a particular score is "/getDetailedScore")
 * 
 * and cached using `useMemo` or maybe an obejct in `useRef`
 */
export type ResponsePreview = Pick<QuizQuestionReponse,   "questionText" | "answer" | "gptScore" >

/**
 * An object that will be assembled from looping through the documents returned by Firestore query
 * 
 * The `id` field will be extracted from the document directly as (firestore document).data()
 * does not add the id to the returned object
 */
export type TReturn ={
    [id: string]: ResponsePreview
}
