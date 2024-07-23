import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

import { RPCError } from "../utils/rpc";

export type DS<T extends DocumentData> =
  | QueryDocumentSnapshot<T>
  | DocumentSnapshot<T>;

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
    return new DocumentResult(doc, collectionName);
  }
  static expect<T extends DocumentData>(
    doc: DS<DocumentData>,
    collectionName?: string
  ) {
    return DocumentResult.from<T>(doc, collectionName).unwrap();
  }
  static expectOrUndefined<T extends DocumentData>(
    doc: 
    DS<DocumentData>,
    collectionName?: string
  ) {
    return DocumentResult.from<T>(doc, collectionName).unwrapOr(undefined)
  }
}
