import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { observable, Observable } from 'rxjs';

//純開發使用
interface ToDo{
  id: number,
  item: string,
  isCompleted: boolean
}

interface ToDoDB{
  id: string,
  name: string,
  createTime: string,
  status: boolean
}

@Injectable({
  providedIn: 'root'
})

export class HandleTodoService {
  key = 0;
  //title = "title from service";
  todoCollection: AngularFirestoreCollection<any>;
  public todos : Observable<ToDoDB[]>;;


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
 
  constructor(private firestoreService: AngularFirestore) { 
    this.todoCollection = this.firestoreService.collection("todo", ref => ref.orderBy("CreateBy"));
    //this.chats = this.chatsCollection.valueChanges()

    this.todos = this.todoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
  }

  AddItem(event){
    this.key += 1;
    //為了Pure Pipe新增全新陣列
    //注意 "..." 的操作方法
    this.todoList = [ ... this.todoList, {
      id: this.key,
      item: event.target.value, 
      isCompleted: false}]

    //DataBase
    this.todoCollection.add({
      name: event.target.value,
      createTime: new Date(),
      user: "tester",
      status: false
    }).then(() => event.target.value = "");
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
