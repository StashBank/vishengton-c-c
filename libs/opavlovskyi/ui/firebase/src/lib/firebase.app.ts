import { inject, Injectable } from '@angular/core';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthCredential,
  getAdditionalUserInfo,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { BehaviorSubject, Observable } from 'rxjs';

import { getFirestore } from 'firebase/firestore';

@Injectable()
export class FirebaseAppService {
  private readonly firestore = getFirestore();
  private readonly provider = new GoogleAuthProvider();
  private readonly auth = getAuth(this.firestore.app);
  private readonly _user$ =  new BehaviorSubject<User|null>(null);
  private readonly _isAuthorized$ =  new BehaviorSubject<boolean>(false);

  get app() {
    return this.firestore.app
  }

  get isAuthorized$(): Observable<boolean> {
    return this._isAuthorized$.asObservable();
  }
  get isAuthorized(): boolean {
    return this._isAuthorized$.getValue();
  }

  get user$(): Observable<User|null> {
    return this._user$.asObservable();
  }
  get user(): User|null {
    return this._user$.getValue();
  }

  constructor() {
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.auth.useDeviceLanguage();
    onAuthStateChanged(this.auth, user => {
      this._user$.next(user)
      this._isAuthorized$.next(user != null)
    })
  }

  async signIn() {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result) as OAuthCredential;
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      const profile = getAdditionalUserInfo(result)

    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.error(errorCode, errorMessage);
      console.log(credential)
    }
  }

  signOut() {
    return this.auth.signOut()
  }

}