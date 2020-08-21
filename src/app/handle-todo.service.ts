import { Injectable } from '@angular/core';

//純開發使用
interface ToDo{
  id: number,
  item: string,
  isCompleted: boolean
}

@Injectable({
  providedIn: 'root'
})

export class HandleTodoService {
  key = 0;
  //title = "title from service";

  todoList :ToDo[] = [
    {
      id: 1,
      item: "Buy Milk",
      isCompleted: false
    },
    {
      id: 2,
      item: "Work",
      isCompleted: false
    }
  ];
 
  constructor() { }

  AddItem(event){
    this.key += 1;
    //為了Pure Pipe新增全新陣列
    //注意 "..." 的操作方法
    this.todoList = [ ... this.todoList, {
      id: this.key,
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
