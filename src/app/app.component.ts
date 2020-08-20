import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myToDo';
  inputPlaceHolder = "What needs to be done??";
  
  showInput(event){
    console.log(event);
    event.target.value = "";
  }
}
