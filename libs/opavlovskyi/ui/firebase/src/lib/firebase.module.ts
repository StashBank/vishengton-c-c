import { NgModule, ModuleWithProviders } from '@angular/core';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { FirebaseAppService } from './firebase.app';
import { FIREBASE, FIRESTORE } from './injection.tokens';

@NgModule({
})
export class FirebaseModule {
  static forRoot(options: FirebaseOptions): ModuleWithProviders<FirebaseModule> {
    return {
      ngModule: FirebaseModule,
      providers: [
        {
          provide: FIREBASE,
          useValue: initializeApp(options)
        },
        {
          provide: FIRESTORE,
          useValue: getFirestore()
        },
        FirebaseAppService
      ]
    }
  }
}