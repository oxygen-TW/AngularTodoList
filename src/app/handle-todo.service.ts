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
  //title = "title from service";

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
    //為了Pure Pipe新增全新陣列
    //注意 "..." 的操作方法
    this.todoList = [ ... this.todoList, {
      item: event.target.value, 
      isCompleted: false}]
  }

  RemoveItem(idx){
    this.todoList = this.todoList.slice();
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

  ChangeStatus(todo: ToDo){
    todo.isCompleted = !todo.isCompleted;
    this.todoList = this.todoList.slice(); 
  }

  getTodoCount(){
    return this.todoList.filter(item => item.isCompleted == false).length;
  }
}
