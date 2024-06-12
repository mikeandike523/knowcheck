// const inpatientCriteria = require("./routes/inpatientCriteria.js");

// exports.analyzeAnswer = inpatientCriteria.analyzeAnswer
// exports.getCorrectCriteria = inpatientCriteria.getCorrectCriteria
// exports.getNumQuestions = inpatientCriteria.getNumQuestions
// exports.getCriteriaName = inpatientCriteria.getCriteriaName

const {createRPCHandler} = require("./utils/rpc.js")

const admin = require("firebase-admin")

admin.initializeApp()

const db = admin.firestore()

/**
 * @param args {
 *  id: string
 * }
 */
module.exports.getSubjectConfig=createRPCHandler(async (args)=>{

})


