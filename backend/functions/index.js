/**
 * The functions used to power the "Know/Check" app
 * 
 * "Know/Check" is dynamic quiz app that draws it's questions from a database and
 * uses the GPT 4 API to serve as a grader for open ended questions
 * 
 * The GPT API is instructed (wiht a context prompt) to use it's general knowledge of the subject matter
 * As well as a list of supporting information unique to the question at hand
 */

const {createRPCHandler, TypicalRPCErrors} = require("./utils/rpc.js")

const admin = require("firebase-admin")

admin.initializeApp()

const db = admin.firestore()

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
module.exports.listSubjects=createRPCHandler(async (args)=>{
// todo
})

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
module.exports.getSubjectConfig=createRPCHandler(async (args)=>{
    const subjectId = args.id;
    const subjectConfig = await db.collection("subjects").doc(subjectId).get()
    if(!subjectConfig.exists){
        throw (await fileError(db, "/getSubjectConfig", (ticketNumber)=>{
            return TypicalRPCErrors.InvalidAPIInputError(`No subject with id ${subjectId}`,ticketNumber)
        }))
    }
    const data = subjectConfig.data()
    // The API reference/typings indicate that data can be undefined
    // IDK why, but I'll handle it anyway
    if(typeof data === "undefined"){
        throw (await fileError(db, "/getSubjectConfig", (ticketNumber)=>{
            return TypicalRPCErrors.MissingDataError(`The data for subject ${subjectId} may be missing`,ticketNumber)
        }))
    }

    return data
})


