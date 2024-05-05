import { Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {BookComponent} from "./book/book.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {AuthorDetailsComponent} from "./author-details/author-details.component";
import {SearchComponent} from "./search/search.component";
import {ShoppingcartComponent} from "./shoppingcart/shoppingcart.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./guard/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'author/:authorid', component: AuthorDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'shoppingcart', component: ShoppingcartComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' },
];
