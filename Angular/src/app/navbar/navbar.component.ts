import {Component, EventEmitter, Output} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faCartShopping, faMagnifyingGlass, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {RouterLink, RouterOutlet} from "@angular/router";
import {SearchService} from "../services/search.service";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected readonly faUser = faUser;
  protected readonly faCartShopping = faCartShopping;
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faUserPlus = faUserPlus;

  onInputChange(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    this.searchService.setSearchQuery(searchText);
    this.searchService.navigateToSearchPage(searchText); // Navegar a la página de búsqueda
  }

  constructor(private searchService: SearchService) {
  }
}
