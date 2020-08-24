import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";
import { map, exhaustMap, switchMap, concatMap, mergeMap, filter } from "rxjs/operators";
// - , 保留第一次

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  users = this.HttpClient.get<User[]>("https://jsonplaceholder.typicode.com/users").pipe(
    map(users => users.map(x => ({ id: x.id, name: x.name })))
  );
  user = this.route.queryParamMap.pipe(
    map(params => params.get('userId')),
    filter(userId => userId != null),
    switchMap(userId => this.HttpClient.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`))
  );

  constructor(private router: Router, private route: ActivatedRoute, private HttpClient: HttpClient) {
    //   this.route.queryParamMap.pipe(
    //     map(params => params.get('userId')),
    //     switchMap(userId => this.HttpClient.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`))
    //     ).subscribe({
    //       next: user => this.user = user //HTTP GET 回來的結果
    //     })
  }

  save(formGroup){
    console.log(formGroup);
  }
  gotoTodo() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    //Json會自動轉成物件
    //   this.HttpClient.get<User[]>("https://jsonplaceholder.typicode.com/users").pipe(
    //     map(users => users.map(x => ({id: x.id, name: x.name})))
    //   ) .subscribe({
    //     next: data => this.users = data
    //   });
  }
}
