import {Component, OnInit} from '@angular/core';
import { DatabaseJSONService } from "../services/database-json.service";
import { BookResponse } from "../model/book";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  Books: any[] = [];

  constructor(private databaseService: DatabaseJSONService) { }
  ngOnInit(): void {
    this.databaseService.getBooks("assets/search.json")
      .subscribe((response: BookResponse) => {
        this.Books = response.books;
      });
  }
}
