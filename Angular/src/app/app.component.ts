import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ShoppingcartComponent} from "./shoppingcart/shoppingcart.component";
import {AuthorDetailsComponent} from "./author-details/author-details.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, RegisterComponent, LoginComponent, ShoppingcartComponent, AuthorDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular';
}
