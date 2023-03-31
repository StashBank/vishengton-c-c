import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { firebase, FirebaseApp } from '@nativescript/firebase-core';
import { Auth, GoogleAuthProvider } from '@nativescript/firebase-auth';
import { GoogleSignin } from '@nativescript/google-signin';
import '@nativescript/firebase-auth'
import { Dialogs } from '@nativescript/core'

@Injectable({
  providedIn: 'root'
})
export class FirebaseAppService {
  private firebaseApp: FirebaseApp;
  private firebaseAuth: Auth;
  private readonly _isAuthorized$ =  new BehaviorSubject<boolean>(false);

  constructor() {
    this.init()
  }

  private get auth() {
    return this.firebaseAuth;
  }

  get isAuthorized$(): Observable<boolean> {
    return this._isAuthorized$.asObservable();
  }

  get isAuthorized(): boolean {
    return this._isAuthorized$.getValue();
  }

  async init() {
    const firebaseRef = firebase();
    this.firebaseApp = await firebaseRef.initializeApp();
    this.firebaseAuth = await firebaseRef.auth();
    this.firebaseAuth.addAuthStateChangeListener(user => this._isAuthorized$.next(user != null))
    await GoogleSignin.configure();
  }

  async signInWithGoogle() {
    try {
      const user = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(user.idToken, user.accessToken)
      await this.auth.signInWithCredential(credential);
    } catch (e) {
      console.error(e)
      console.error(e.stack)
      await this.showAlertDialog(e.message)
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      const creds = await this.auth.signInWithEmailAndPassword(email, password)
    } catch (e) {
      console.error(e)
      console.error(e.stack)
      await this.showAlertDialog(e.message)
    }
  }

  signOut() {
    return this.auth.signOut()
  }

  private showAlertDialog(message: string) {
    const alertOptions = {
      title: 'Information',
      message,
      okButtonText: 'Ok',
      cancelable: false
    }

    return Dialogs.alert(alertOptions)
  }
}