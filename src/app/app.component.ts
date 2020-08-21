import { Component, DoCheck } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  todoList :ToDo[] = [
    {
      item: "Buy Milk",
      isCompleted: false
    },
    {
      item: "Work",
      isCompleted: false
    }
  ];
  todoCount = this.changeCount();
  
  AddItem(event){
    //console.log(event);
    this.todoList.push({
      item: event.target.value, 
      isCompleted: false})
    event.target.value = "";
  }

  RemoveItem(idx){
    this.todoList.splice(idx, 1);
  }

  AllComplete(){
    this.todoList.forEach(todo =>  {
      todo.isCompleted = true;
   });
  }

  RemoveCompleted(){
    this.todoList = this.todoList.filter(item => item.isCompleted == false);
  }

  changeCount(){
    return this.todoList.filter(item => item.isCompleted == false).length;
  }

  //當畫面有變更時即會執行(參考 Angular 生命週期)
  ngDoCheck(){
    this.todoCount = this.changeCount();
  } 
}
