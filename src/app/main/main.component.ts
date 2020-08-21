import { Component, DoCheck } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HandleTodoService } from '../handle-todo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements DoCheck {
  title = 'myToDo';
  inputPlaceHolder = "What needs to be done??";
  newTodo = "default Value";
  todoCount = this.service.getTodoCount();
  cond = "all";

  //Component 建構涵式
  constructor(public service: HandleTodoService){ };
  
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
  
  setCond(flag: string){
    this.cond = flag;
  }

  //當畫面有變更時即會執行(參考 Angular 生命週期)
  ngDoCheck(){
    this.todoCount = this.service.getTodoCount();
  } 
}
