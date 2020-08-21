import { Component, DoCheck } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HandleTodoService } from './handle-todo.service';

//純開發使用
interface ToDo{
  item: string,
  isCompleted: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements DoCheck {
  title = 'myToDo';
  inputPlaceHolder = "What needs to be done??";
  newTodo = "default Value";
  todoCount = this.changeCount();

  constructor(public service: HandleTodoService){ };
  
  todoList = this.service.todoList;
  
  AddItem(event){
    this.service.AddItem(event);
    event.target.value = "";
  }

  RemoveItem(idx){
    this.service.RemoveItem(idx);
  }

  AllComplete(){
    this.service.AllComplete();
  }

  RemoveCompleted(){
    this.service.RemoveCompleted();
  }

  changeCount(){
    return this.service.todoList.filter(item => item.isCompleted == false).length;
  }

  //當畫面有變更時即會執行(參考 Angular 生命週期)
  ngDoCheck(){
    this.todoCount = this.changeCount();
  } 
}
