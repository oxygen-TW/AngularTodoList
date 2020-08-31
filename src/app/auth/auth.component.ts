import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { HandleTodoService } from "../handle-todo.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})

export class AuthComponent implements OnInit {

  constructor(public auth: AngularFireAuth, private service: HandleTodoService, private route: ActivatedRoute, private router: Router) {
    this.auth.user.subscribe({
      next: state => {
        this.service.SetUid(state.uid);
      },
      error: (err) => {},
      complete: () => { console.log("End") }
    })
  }

  async login() {
    await this.auth.signInWithPopup(new auth.GoogleAuthProvider())
    this.service.ReloadData();
    this.redir();
  }

  loginFacebook() {
    this.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  redir() {
    this.router.navigate(['./todo'], { relativeTo: this.route });
  }
  ngOnInit(): void {
  }

}
