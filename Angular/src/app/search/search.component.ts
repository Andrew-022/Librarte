import {Component, OnInit} from '@angular/core';
import { UserJsonService } from "../services/user-json.service";
import {Book} from "../model/book";
import {NgForOf} from "@angular/common";
import {BookComponent} from "../book/book.component";
import {BookJsonService} from "../services/book-json.service";

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

  constructor(private bookJsonService: BookJsonService) { }
  ngOnInit(): void {
    this.bookJsonService.getBooks("assets/search.json")
      .subscribe((response: any) => {
        this.books = response.books;
      });
  }
}
