import { Injectable, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { observable, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

interface ToDo{
  id: string,
  name: string,
  createTime: string,
  status: boolean 
}

@Injectable({
  providedIn: 'root'
})

export class HandleTodoService implements DoCheck{
  key = 0;
  UserId = "tester";
  //title = "title from service";
  todoCollection: AngularFirestoreCollection<any>;
  CollectionForAdd: AngularFirestoreCollection<any>;
  public todos : Observable<ToDo[]>;;
 
   constructor(private firestoreService: AngularFirestore, public auth: AngularFireAuth) { 
    //this.SetUid("bs5TqvzfrFXI0dzJOh0o1ZNiJrC3");
    this.auth.user.subscribe({
      next: state => {
        this.SetUid(state.uid);
      },
      complete: () => { console.log("End")}
    })
  
    console.log("ckp1:" + this.UserId);
    this.ReloadData();
    /*while(this.UserId == "tester"){
    }*/
  }

  async ReloadData(){
    console.log("ckp2:" + this.UserId);
    this.todoCollection = this.firestoreService.collection<ToDo>("todo", ref => ref.where("user", "==", this.UserId));
    this.todoCollection.ref.orderBy("createTime");
    this.CollectionForAdd = this.firestoreService.collection("todo", ref => ref.orderBy("createTime"));
    //this.todoCollection = this.firestoreService.collection("todo", ref => ref.orderBy("createTime"));
    //this.chats = this.chatsCollection.valueChanges()

    this.todos = this.todoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
  }
  SplitUserData(){
    let tmpQuerySnapshot = this.todoCollection.get();

  }
  SetUid(uid: string){
    this.UserId = uid;
    console.log("Service:"+this.UserId);
  }
  AddItem(event){
    //DataBase
    this.todoCollection.add({
      name: event.target.value,
      createTime: new Date(),
      user: this.UserId,
      status: false
    }).then(() => event.target.value = "");
  }

  RemoveItem(id){
    const doc = this.todoCollection.doc(id);
    doc.delete();
  }
  
  AllComplete(){    
    let s = this.todos.subscribe({
      next: x => {
        x.forEach(element => {
         element.status = true;
         const doc = this.todoCollection.doc(element.id);
         doc.update(element);
        });
        s.unsubscribe(); //重要 但我不知道為什麼
      }
    })
  }

  RemoveCompleted(){
    let s = this.todos.subscribe({
      next: x => {
        x.forEach(element => {
         if(element.status == true){
          this.RemoveItem(element.id);
          console.log("delete: "+ element.id)
         }
        });
        s.unsubscribe();  //重要 但我不知道為什麼
      }
    })
  }

  ChangeStatus({ id, ...item }){
    item.status = !item.status;
    const doc = this.todoCollection.doc(id);
    doc.update(item);
  }

  getTodoCount(){
    //return this.todoList.filter(item => item.isCompleted == false).length;
    // let s = this.todos.subscribe({
    //   next: x => {
    //     //s.unsubscribe();  //重要 但我不知道為什麼
    //     return x.filter(item => item.status == true).length;
    //   }
    // }) 
  }

  ngDoCheck(){
    console.log("ckp3:" + this.UserId);
    this.ReloadData();
  }
}
