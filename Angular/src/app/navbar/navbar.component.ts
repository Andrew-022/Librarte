import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faCartShopping, faMagnifyingGlass, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected readonly faUser = faUser;
  protected readonly faCartShopping = faCartShopping;
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faUserPlus = faUserPlus;
}
