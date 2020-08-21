import { Injectable } from '@angular/core';

//純開發使用
interface ToDo{
  item: string,
  isCompleted: boolean
}

@Injectable({
  providedIn: 'root'
})
export class HandleTodoService {
  title = "title from service";

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

  constructor() { }

  AddItem(event){
    //console.log(event);
    this.todoList.push({
      item: event.target.value, 
      isCompleted: false})
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

}
