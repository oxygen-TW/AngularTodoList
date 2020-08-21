import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//純開發使用
interface ToDo{
  item: string,
  isCompleted: boolean
}

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input("item") todo; //要 import Input
  @Input() idx;

  @Output() remove = new EventEmitter();

  RemoveTodo(idx){
    this.remove.emit(idx);
  }

  ChangeStatus(todo: ToDo){
    todo.isCompleted = !todo.isCompleted;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
