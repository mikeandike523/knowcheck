"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createHandlerListSubjects;
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
function createHandlerListSubjects(db) {
    return async function listSubjects() {
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
    };
}
;
