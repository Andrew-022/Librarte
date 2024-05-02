import { Component, Input } from '@angular/core';
import {Book} from "../model/book";
import {UserJsonService} from "../services/user-json.service";
import {firebaseRepository} from "../services/firebaseRepository";
import {Subscription} from "rxjs";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  @Input() book!: Book;
  @Input() cartView: boolean = true;
  @Input() bookId!: string;
  private bookSubscription!: Subscription;
  constructor(private databaseService: UserJsonService, private firebaseRepository: firebaseRepository) { }

  ngOnInit(): void {
    if (!this.book && this.bookId) {
      this.loadBook();
    }
  }


  private async loadBook(): Promise<void> {
    // this.bookSubscription = this.databaseService.getBookById(this.bookId)
    //   .subscribe((book: Book) => {
    //     this.book = book;
    //   });
    try {
      const book = await this.firebaseRepository.getBookById(this.bookId);
      if (book) {
        this.book = book;
      } else {
        console.log("No se encontró ningún libro con el ID proporcionado.");
      }
    } catch (error) {
      console.error("Error al cargar el libro:", error);
    }
  }

  ngOnDestroy(): void {
    if (this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }

}
