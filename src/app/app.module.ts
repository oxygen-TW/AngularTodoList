import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FilterPipe } from './filter.pipe';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  //data: 同步資料
  //resolve: 非同步，可以先取得api資料，也是在.data中取得
  //data和resolve內容不能重複
  {path: "", component: MainComponent, data:{
    cond: "all"
  }},
  {path: "about", component: AboutComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    FilterPipe,
    MainComponent,
    AboutComponent
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
