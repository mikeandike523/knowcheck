/**
 *
 * @param {import("firebase-admin/firestore").Firestore} db
 * @returns {Promise<Array<string>>}
 */
export async function listCollections(db) {
  const collections = await db.listCollections();
  return collections.map((collection) => collection.id);
}

/**
 *
 * @param {import("firebase-admin/firestore").Firestore} db
 * @returns {Promise<boolean>} True if some documentes were deleted, false if the collection was already empty
 */
export async function clearCollection(db, collectionId) {
  const collectionRef = db.collection(collectionId);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    return false;
  }

  const batch = db.batch();
  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  return true;
}
