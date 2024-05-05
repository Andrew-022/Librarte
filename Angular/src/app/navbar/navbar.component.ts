import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faCartShopping, faMagnifyingGlass, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {RouterLink, Router, RouterOutlet, NavigationStart} from "@angular/router";
import {SearchService} from "../services/search.service";
import {FirebaseAuthService} from "../services/firebase-auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  protected readonly faUser = faUser;
  protected readonly faCartShopping = faCartShopping;
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faUserPlus = faUserPlus;

  loggedNavbarView: boolean = false

  constructor(private authService: FirebaseAuthService ,private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.loggedNavbarView = !!user;
    });
  }

  onInputChange(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;

    this.searchService.setSearchQuery(searchText);

    if(searchText != '') {
      this.searchService.navigateToSearchPage(searchText);
    }
  }

  onLogout() {
    this.authService.logout();
    console.log(this.router.url)
    if(this.router.url != 'home') {
      this.router.navigate(['/home'])
    }
  }
}
