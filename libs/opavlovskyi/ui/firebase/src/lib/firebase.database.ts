import { Injectable, inject } from '@angular/core';
import {
  getFirestore,
  collection,
  doc,
  CollectionReference,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
  WithFieldValue,
  DocumentData,
  DocumentReference,
  Query
} from 'firebase/firestore';

@Injectable({ providedIn: 'root'})
export class FirebaseDbService {
  private readonly firestore = getFirestore()
  private get database() {
    return getFirestore(this.firestore.app)
  }

  collection(path: string) {
    return collection(this.database, path)
  }

  doc<T>(path: string, id: string) {
    return doc(this.database, path, id)
  }

  async add(reference: CollectionReference, value: WithFieldValue<DocumentData>) {
    const doc = await addDoc(reference, value);
    return {
      ...doc,
      id: doc.id
    }
  }

  set(reference: DocumentReference, value: WithFieldValue<DocumentData>) {
    return setDoc(reference, value)
  }

  async get<T>(query: Query<DocumentData>) {
    const response = await  getDocs(query)
    return response.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      } as T)
    )
  }

  async getDoc<T>(path: string, id: string) {
    const docSNapshot = await getDoc(this.doc(path, id))
    return {
        ...docSNapshot.data(),
        id: docSNapshot.id,
      } as T
  }

  deleteDoc(reference: DocumentReference) {
    return deleteDoc(reference)
  }
  
}