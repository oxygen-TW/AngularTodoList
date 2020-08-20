import { Component } from '@angular/core';
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

export class AppComponent {
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
  todoCount = 0;
  
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

  }

  ChangeStatus(todo: ToDo){
    todo.isCompleted = !todo.isCompleted;
  }

  changeCount(){
    
  }
}
