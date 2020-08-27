import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
}) 

export class AuthComponent implements OnInit {

  constructor(public auth: AngularFireAuth) {
  }
  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginFacebook(){
    this.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  
  logout() {
    this.auth.signOut();
  }

  ngOnInit(): void {
  }

}
