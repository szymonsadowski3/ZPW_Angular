import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
export interface Credentials {
  email: string;
  password: string;
}
@Injectable({providedIn: 'root'})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  constructor(private fireAuth: AngularFireAuth) {}
  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }
  login({email, password}: Credentials) {
    // if (this.fireAuth.user != null) {
    //   const session = this.fireAuth.auth.Persistence.SESSION;
    //   return this.fireAuth.auth.setPersistence(session).then(() => {
    //     return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    //   });
    // } else {
      return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    // }
  }
  register({email, password}: Credentials) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email,
      password);
  }
  logout() {
    return this.fireAuth.auth.signOut();
  }
}
