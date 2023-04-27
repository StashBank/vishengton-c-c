import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { FirebaseDbService } from './firebase.database';

export function InjectFirebaseRepository<T>(collectionName: string) {
  return (target: any, propertyKey: any) => {
    const firebaseDb = new FirebaseDbService()
    target[propertyKey as string] = new FirebaseRepository<T>(firebaseDb, collectionName)
  }
}

export const COLLECTION_NAME = new InjectionToken<string>('collectionName')

@Injectable({ providedIn: 'root' })
export class FirebaseRepository<T> {

  private get collection() {
    return this.firebaseDb.collection(this.collectionName)
  }

  constructor(
    private readonly firebaseDb: FirebaseDbService,
    @Inject(COLLECTION_NAME)
    @Optional()
    private readonly collectionName: string,
  ) {}

  list() {
    return this.firebaseDb.get<T>(this.collection)
  }

  getById(id: string) {
    return this.firebaseDb.getDoc<T>(this.collectionName, id)
  }

  create(value: { [x: string]: any; }) {
    return this.firebaseDb.add(this.collection, value)
  }

  update(id: string, value: { [x: string]: any; }) {
    return this.firebaseDb.set(
      this.firebaseDb.doc(this.collectionName, id),
      value
    )
  }

  delete(id: string) {
    return this.firebaseDb.deleteDoc(this.firebaseDb.doc(this.collectionName, id))
  }
}