import { Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {BookComponent} from "./book/book.component";
import {BookDetailsComponent} from "./book-details/book-details.component";

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'book/:id', component: BookDetailsComponent },
];
