import { NgModule} from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { GoogleSignInButton } from '@nativescript/google-signin';

registerElement(
  'GoogleSignInButton',
  () => GoogleSignInButton
);

@NgModule({
})
export class FirebaseModule {
}