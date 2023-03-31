import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Page, TextField, Utils } from '@nativescript/core';
import { FirebaseAppService } from '@opavlovskyi/mobile/firebase';
import { environment } from '../../../environments/environment';
import { setStatusBarColor } from '../../../utils';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  helloText = environment.helloText;
  appTitle = environment.appTitle;

  get isAuthorized$() {
    return this.firebaseApp.isAuthorized$;
  }

  constructor(
    private readonly firebaseApp: FirebaseAppService,
    private readonly page: Page
  ) {}

  async signInWithGoogle() {
    await this.firebaseApp.signInWithGoogle()
  }

  ngOnInit() {
    setStatusBarColor('dark', '#97d9e9');
  }

  onReturnPress(args) {
    const textField = args.object as TextField;
    console.log(textField.text);
    Utils.setTimeout(() => {
      textField.dismissSoftInput() // Hides the soft input method, usually a soft keyboard.
    }, 100)
  }

  signInWithEmailAndPassword() {
    const email = this.page.getViewById<TextField>('email').text;
    const password = this.page.getViewById<TextField>('password').text;
    this.firebaseApp.signInWithEmailAndPassword(email, password)
  }

}
