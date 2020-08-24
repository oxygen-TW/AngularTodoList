import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private HttpClient: HttpClient) { }

  gotoTodo(){
    this.router.navigate(['/'], { relativeTo: this.route});
  }
  ngOnInit(): void {
    //Json會自動轉成物件
    this.HttpClient.get("https://jsonplaceholder.typicode.com/users").subscribe({
      next: data => console.log(data)
    });
  }

}
