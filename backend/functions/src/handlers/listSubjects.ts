// static js and ts imports
// js imports are assumed to be commonjs compatible
import {Firestore} from 'firebase-admin/firestore'

/**
 * 
 * A function that takes in important firebase resources
 * and creates the handler given those resources
 * 
 * facilitates passing down resources instead of recreation
 * 
 * @param db
 * @returns 
 */
export default function createHandlerListSubjects (
    db:Firestore
) {
    return async function listSubjects () {
        const subjects = await db
        .collection("subjects")
        .where("unlisted", "==", false)
        .get();
    return subjects.docs.map((doc) => {
        return {
        name: doc.data().name,
        blurb: doc.data().blurb,
        id: doc.id,
        };
    });
    }
};