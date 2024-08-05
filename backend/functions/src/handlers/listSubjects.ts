import {Firestore} from 'firebase-admin/firestore'

export default function createHandlerListSubjects (
    getDB:()=>Firestore
) {
    return async function listSubjects () {
        const db = getDB();
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