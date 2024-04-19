import { Component, Input } from '@angular/core';
import {Book} from "../model/book";
import {UserJsonService} from "../services/user-json.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  @Input() book!: Book;
  @Input() cartView: boolean = true;
  @Input() bookId!: string;
  private bookSubscription!: Subscription;
  constructor(private databaseService: UserJsonService) { }

  ngOnInit(): void {
    if (!this.book && this.bookId) {
      this.loadBook();
    }
  }

  private loadBook(): void {
    this.bookSubscription = this.databaseService.getBookById(this.bookId)
      .subscribe((book: Book) => {
        this.book = book;
      });
  }

  ngOnDestroy(): void {
    if (this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }
}
