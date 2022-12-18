import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.auth.login()
    // this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider())
  }

  signup(){
    this.auth.signup('18702604713@163.com', '123456');
  }
}
