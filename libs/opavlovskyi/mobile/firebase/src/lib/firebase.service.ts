import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { firebase, FirebaseApp } from '@nativescript/firebase-core';
// import { Auth, GoogleAuthProvider } from '@nativescript/firebase-auth';
// import { GoogleSignin } from '@nativescript/google-signin';
// import '@nativescript/firebase-auth'


@Injectable({
  providedIn: 'root'
})
export class FirebaseAppService {
  // private firebaseApp: FirebaseApp;
  // private firebaseAuth: Auth;
  // private readonly _isAuthorized$ =  new BehaviorSubject<boolean>(false);

  // constructor() {
  //   this.init()
  // }

  // private get auth() {
  //   return this.firebaseAuth;
  // }

  // get isAuthorized$(): Observable<boolean> {
  //   return this._isAuthorized$.asObservable();
  // }

  // get isAuthorized(): boolean {
  //   return this._isAuthorized$.getValue();
  // }

  async init() {
    //const firebaseRef = firebase();
    //console.log('firebaseRef is defined %s', firebaseRef != null)
    //this.firebaseApp = await firebaseRef.initializeApp();
    //this.firebaseAuth = await firebaseRef.auth();
    //this.firebaseAuth.addAuthStateChangeListener(user => this._isAuthorized$.next(user != null))
    //GoogleSignin.configure();
  }

  async signIn() {
    // const user = await GoogleSignin.signIn();
    // const credential = GoogleAuthProvider.credential(user.idToken, user.accessToken)
    // return this.auth.signInWithCredential(credential)
    return Promise.resolve(null)
  }

  signOut() {
    //return this.auth.signOut()
  }
}