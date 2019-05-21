import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  Login() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  Logout() {
    this.afAuth.auth.signOut();
  }
}
