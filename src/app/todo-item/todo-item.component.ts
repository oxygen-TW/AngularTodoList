import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HandleTodoService } from "../handle-todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})

export class TodoItemComponent implements OnInit {
  @Input("item") todo; //要 import Input
  @Input() idx;

  @Output() remove = new EventEmitter();

  RemoveTodo(id){
    this.service.RemoveItem(id);
  }

  ChangeStatus(todo){
    this.service.ChangeStatus(todo);
  }

  //TypeScript 語法
  //指定型別後自動注入
  //Service 為全域共用
  constructor(public service: HandleTodoService) {
    //console.log(this.service.title);
   }

  ngOnInit(): void {
  }
}
