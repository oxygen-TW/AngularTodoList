import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'myToDo';
  inputPlaceHolder = "What needs to be done??";
  newTodo = "default Value";
  todoList = [
    {
      item: "Buy Milk",
      isCompleted: false
    },
    {
      item: "Work",
      isCompleted: false
    }
  ];

  AddItem(event){
    console.log(event);
    this.todoList.push({item: event.target.value, isCompleted: false})
    event.target.value = "";
  }

  RemoveItem(index){
    this.todoList.splice(index, 1);
  }

  RemoveCompleted(){

  }
}
