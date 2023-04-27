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
  DocumentReference
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

  add(reference: CollectionReference, value: WithFieldValue<DocumentData>) {
    return addDoc(reference, value).then(doc => ({
      ...doc,
      id: doc.id
    }))
  }

  set(reference: DocumentReference, value: WithFieldValue<DocumentData>) {
    return setDoc(reference, value)
  }

  get<T>(reference: CollectionReference) {
    return getDocs(reference).then(r => r.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    } as T)))
  }

  getDoc<T>(path: string, id: string) {
    return getDoc(this.doc(path, id)).then(doc => ({
      ...doc.data(),
      id: doc.id,
    } as T))
  }

  deleteDoc(reference: DocumentReference) {
    return deleteDoc(reference)
  }
  
}