import {Component, OnInit} from '@angular/core';
import { DatabaseJSONService } from "../services/database-json.service";
import {Book, BookResponse} from "../model/book";
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

  constructor(private databaseService: DatabaseJSONService) { }
  ngOnInit(): void {
    this.databaseService.getBooks("assets/search.json")
      .subscribe((response: BookResponse) => {
        this.books = response.books;
      });
  }

}
