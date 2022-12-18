import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, switchMap } from 'rxjs';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User | null>

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(switchMap(user => this.userService.get(user?.uid as string)))
  }

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || '/';
    localStorage.setItem("returnUrl", returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())

    // this.afAuth.signInWithEmailAndPassword('18702604713@163.com', 'zwm19950806')
    //   .then(userCredential => {
    //     const user = userCredential.user;
    //     console.log(userCredential)
    //   })
    // (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    // (window as any).recaptchaVerifier.render()
    // console.log(new firebase.auth.RecaptchaVerifier('recaptcha-container'))
    // this.afAuth.signInWithPhoneNumber("18702604713", (window as any).recaptchaVerifier)
    //   .then(function (confirmationResult) {
    //     var verificationCode = window.prompt('Please enter the verification ' +
    //       'code that was sent to your mobile device.');
    //     return confirmationResult.confirm('123456');
    //   })
    //   .catch(function (error) {
    //     // Handle Errors here.
    //   });
  }


  signup(email: string, pwd: string) {
    this.afAuth.createUserWithEmailAndPassword(email, pwd)
      .then(userCredential => {
        const user = userCredential.user;
        console.log()
      })
  }

  logout() {
    this.afAuth.signOut()
  }
}
