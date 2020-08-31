import { Component, DoCheck, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HandleTodoService } from '../handle-todo.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements DoCheck{
  title = 'myToDo';
  inputPlaceHolder = "What needs to be done??";
  newTodo = "default Value";
  todoCount = this.service.getTodoCount();
  cond = "all";
  todoList = this.service.todos;

  //Component 建構涵式
  constructor(public service: HandleTodoService, private route: ActivatedRoute, private router: Router){
    this.route.queryParamMap.subscribe({
      next: (params) => {
        if(params.get("cond") == null){
          this.cond = this.route.snapshot.data.cond;
        }         
        else{
          this.cond = params.get("cond");
        }       
      },
      error: (err) =>{},
      complete: () => {}
    })

   }
  
  AddItem(event){
    this.service.AddItem(event);
    event.target.value = "";
  }

  AllComplete(){
    this.service.AllComplete();
  }

  RemoveCompleted(){
    this.service.RemoveCompleted();
  }

  gotoAbout(){
    this.router.navigate(['./about'], { relativeTo: this.route});
  }

  gotoContact(){
    this.router.navigate(['./contact'], { relativeTo: this.route});
  }

  gotoChat(){
    this.router.navigate(['./chat'], { relativeTo: this.route});   
  }
  //當畫面有變更時即會執行(參考 Angular 生命週期)
  ngDoCheck(){
    this.todoCount = this.service.getTodoCount();
  } 
}
