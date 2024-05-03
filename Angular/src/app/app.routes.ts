import { Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: '*', component: RegisterComponent},
  { path: 'data/users', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
