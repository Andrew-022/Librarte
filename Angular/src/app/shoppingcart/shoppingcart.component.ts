import { Component } from '@angular/core';
import {Book} from "../model/book";
import {UserJsonService} from "../services/user-json.service";
import {BookComponent} from "../book/book.component";
import {last} from "rxjs";

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [
    BookComponent
  ],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css'
})
export class ShoppingcartComponent {
  books: Book[] = [];
  constructor(private databaseService: UserJsonService) { }
  ngOnInit(): void {
    this.databaseService.getBooks("assets/search.json")
      .subscribe((response: any) => {
        this.books = response.books;
      });
  }

  protected readonly last = last;
}
