import {Component, OnInit} from '@angular/core';
import { UserJsonService } from "../services/user-json.service";
import {Book} from "../model/book";
import {NgForOf} from "@angular/common";
import {BookComponent} from "../book/book.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgForOf,
    BookComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  books: Book[] = [];

  constructor(private databaseService: UserJsonService) { }
  ngOnInit(): void {
    this.databaseService.getBooks("assets/search.json")
      .subscribe((response: any) => {
        this.books = response.books;
      });
  }
}
