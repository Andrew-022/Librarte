import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {NavbarComponent} from "./navbar/navbar.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ShoppingcartComponent} from "./shoppingcart/shoppingcart.component";
import {AuthorDetailsComponent} from "./author-details/author-details.component";
import {FirebaseAuthService} from "./services/firebase-auth.service";
import {BookDetailsComponent} from "./book-details/book-details.component";
import { MatDialogModule } from "@angular/material/dialog";
import {HomepageComponent} from "./homepage/homepage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule, MatDialogModule, RouterOutlet, SearchComponent, RegisterComponent, LoginComponent, ShoppingcartComponent, AuthorDetailsComponent, BookDetailsComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Angular';
  authService = inject(FirebaseAuthService)
  ngOnInit(): void{
    this.authService.user$.subscribe((user) =>{
      if(user){
        // @ts-ignore
        this.authService.currentUserSig.set({
          email: user.email!,
          name: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null)
      }
      console.log(this.authService.currentUserSig());
    });
  }
}
