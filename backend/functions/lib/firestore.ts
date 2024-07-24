import {
  DocumentData,
  DocumentSnapshot,
  Firestore,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

import { RPCError } from "../utils/rpc";

export type DS<T extends DocumentData> =
  | QueryDocumentSnapshot<T, T>
  | DocumentSnapshot<T, T>;

export class DocumentResult<T extends DocumentData> {
  private doc: DS<T>;
  private collectionName?: string;
  constructor(doc: DS<T>, collectionName?: string) {
    this.doc = doc;
    this.collectionName = collectionName;
  }
  unwrap(): T {
    if (!this.doc.exists) {
      throw new RPCError({
        status: 404,
        logMessage: `No document in collection "${this.collectionName}" matching the given query.`,
      });
    }
    return this.doc.data() as T;
  }
  unwrapOr<TAlt extends T | undefined = T>(defaultVal: TAlt): T | TAlt {
    if (this.doc.exists) {
      return this.doc.data() as T;
    }
    return defaultVal;
  }
  unwrapOrElse<TAlt extends T | undefined = T>(fn: () => TAlt): T | TAlt {
    if (this.doc.exists) {
      return this.doc.data() as T;
    }
    return fn();
  }
  static from<T extends DocumentData>(
    doc: DS<DocumentData>,
    collectionName?: string
  ) {
    return new DocumentResult<T>(doc as DS<T>, collectionName);
  }
  static expect<T extends DocumentData>(
    doc: DS<DocumentData>,
    collectionName?: string
  ) {
    return DocumentResult.from<T>(doc as DS<T>, collectionName).unwrap();
  }
  static expectOrUndefined<T extends DocumentData>(
    doc: DS<DocumentData>,
    collectionName?: string
  ) {
    return DocumentResult.from<T>(doc as DS<T>, collectionName).unwrapOr(undefined);
  }
}

async function getOneById<T extends DocumentData>(
  db: Firestore,
  collectionName: string,
  id: string
): Promise<DocumentResult<T>> {
  const doc = await db.collection(collectionName).doc(id).get() as DS<T>
  return DocumentResult.from<T>(doc, collectionName);
}

export class Model<T extends DocumentData> {
  private db: Firestore|undefined;
  private collectionName: string;
  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.db = undefined;
  }
  getDBOrThrow(): Firestore{
    if (!this.db) {
      throw new Error("No Firestore instance provided");
    }
    return this.db;
  }
  connect(db: Firestore) {
    const copy = new Model<T>(this.collectionName);
    copy.db = db;
    return copy
  }
  async getOne(id: string): Promise<DocumentResult<T>> {
    return getOneById<T>(this.getDBOrThrow(), this.collectionName, id);
  }
}
