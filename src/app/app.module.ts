import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FilterPipe } from './filter.pipe';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: "", component: MainComponent},
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
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
