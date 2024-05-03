import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery() {
    return this.searchQuerySubject.asObservable();
  }

  navigateToSearchPage(query: string) {
    this.router.navigate(['/search'])
  }
  constructor(private router: Router) { }
}
