import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user!: firebase.User | null;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.authState.subscribe((user) => (this.user = user));
  }

  signUp(email: string, password: string) {
    return from(
      this.angularFireAuth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          return res.user;
        })
        .catch((err) => {
          console.log('Something is wrong:', err.message);
          throw err;
        })
    );
  }

  signIn(email: string, password: string) {
    return from(
      this.angularFireAuth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          return res.user;
        })
        .catch((err) => {
          console.log('Something is wrong:', err.message);
          throw err;
        })
    );
  }

  signOut() {
    return from(this.angularFireAuth.signOut());
  }

  isAuthenticated() {
    return !!this.user;
  }
}
