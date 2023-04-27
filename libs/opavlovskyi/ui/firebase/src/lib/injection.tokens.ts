import { InjectionToken } from '@angular/core';
import { FirebaseApp } from 'firebase/app';


export const FIREBASE = new InjectionToken<FirebaseApp>('FIREBASE')