import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { QueryConstraint, query, where } from 'firebase/firestore';
import { FirebaseDbService } from './firebase.database';
import { FirebaseAppService } from './firebase.app';

export function InjectFirebaseRepository<T>(collectionName: string) {
  return (target: any, propertyKey: any) => {
    const firebaseDb = new FirebaseDbService()
    const firebaseApp = new FirebaseAppService();
    target[propertyKey as string] = new FirebaseRepository<T>(firebaseDb, firebaseApp,collectionName)
  }
}

export const COLLECTION_NAME = new InjectionToken<string>('collectionName')

@Injectable({ providedIn: 'root' })
export class FirebaseRepository<T> {

  protected get collection() {
    return this.firebaseDb.collection(this.collectionName)
  }

  protected get currentUserId() {
    return this.firebaseApp.user?.uid as string;
  }

  constructor(
    protected readonly firebaseDb: FirebaseDbService,
    protected readonly firebaseApp: FirebaseAppService,
    @Inject(COLLECTION_NAME)
    @Optional()
    private readonly collectionName: string,
  ) {}

  list() {
    const q = query(
      this.collection,
      where('createdById', '==' ,this.currentUserId)
    )
    return this.firebaseDb.get<T>(q)
  }

  query(...queryConstraints: QueryConstraint[]) {
    const q = query(
      this.collection,
      ...queryConstraints
    )
    return this.firebaseDb.get<T>(q)
  }

  getById(id: string) {
    return this.firebaseDb.getDoc<T>(this.collectionName, id)
  }

  create(value: { [x: string]: any; }) {
    const userId = this.currentUserId;
    const timestamp = new Date();
    return this.firebaseDb.add(this.collection, {
      createdById: userId,
      createdAt: timestamp,
      updatedById: userId,
      updatedAt: timestamp,
      ...value
    })
  }

  update(id: string, value: { [x: string]: any; }) {
    const userId = this.currentUserId;
    const timestamp = new Date()
    return this.firebaseDb.set(
      this.firebaseDb.doc(this.collectionName, id),
      {
        updatedById: userId,
        updatedAt: timestamp,
        ...value
      }
    )
  }

  delete(id: string) {
    return this.firebaseDb.deleteDoc(this.firebaseDb.doc(this.collectionName, id))
  }
}