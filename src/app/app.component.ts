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
  todoCount = this.changeCount();
  
  AddItem(event){
    //console.log(event);
    this.todoList.push({
      item: event.target.value, 
      isCompleted: false})
    event.target.value = "";

    //更新計數
    this.todoCount = this.changeCount();
  }

  RemoveItem(idx){
    this.todoList.splice(idx, 1);

    //更新計數
    this.todoCount = this.changeCount();
  }

  AllComplete(){
    this.todoList.forEach(todo =>  {
      todo.isCompleted = true;
   });
    //更新計數
    this.todoCount = this.changeCount();
  }

  RemoveCompleted(){
    this.todoList = this.todoList.filter(item => item.isCompleted == false);
  }

  ChangeStatus(todo: ToDo){
    todo.isCompleted = !todo.isCompleted;

    //更新計數
    this.todoCount = this.changeCount();
  }

  changeCount(){
    let tmpList = this.todoList.filter(item => item.isCompleted == false);
    return tmpList.length;
  }
}
