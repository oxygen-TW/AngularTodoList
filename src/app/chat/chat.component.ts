import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatsCollection: AngularFirestoreCollection<any>;
  chats;
  message;


  //Firebase storage CRUD
  constructor(private firestoreService: AngularFirestore) {
    this.chatsCollection = this.firestoreService.collection("chat", ref => ref.orderBy("CreateBy"));
    //this.chats = this.chatsCollection.valueChanges()

    this.chats = this.chatsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
    console.log(this.chats);
   }

  Send(){
    this.chatsCollection.add({
      message: this.message,
      CreateBy: new Date()
    }).then(() => this.message = "");
  }

  remove(id){
    const doc = this.chatsCollection.doc(id);
    doc.delete();
  }

  update({ id, ...item }){
    const doc = this.chatsCollection.doc(id);
    doc.update(item);
  }
  
  ngOnInit(): void {
  }

}
