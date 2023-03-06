import { InjectionToken } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore/lite';


export const FIREBASE = new InjectionToken<FirebaseApp>('FIREBASE')
export const FIRESTORE = new InjectionToken<Firestore>('FIRESTORE')