import { Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ShoppingcartComponent} from "./shoppingcart/shoppingcart.component";

export const routes: Routes = [{ path: 'data/users', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shoppingcart', component: ShoppingcartComponent }];
