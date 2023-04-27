import { NgModule, ModuleWithProviders } from '@angular/core';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { FirebaseDatePipe } from './date.pipe';
import { FirebaseAppService } from './firebase.app';
import { FirebaseDbService } from './firebase.database';
import { FIREBASE } from './injection.tokens';

@NgModule({
  declarations: [
    FirebaseDatePipe
  ],
  exports: [
    FirebaseDatePipe
  ]
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
        FirebaseAppService,
        FirebaseDbService,
      ]
    }
  }
}