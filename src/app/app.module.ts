import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FilterPipe } from './filter.pipe';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from "@angular/common/http";
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  //data: 同步資料
  //resolve: 非同步，可以先取得api資料，也是在.data中取得
  //data和resolve內容不能重複
  {path: "", component: MainComponent, data:{
    cond: "all"
  }},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    FilterPipe,
    MainComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
