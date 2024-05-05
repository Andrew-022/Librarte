import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SearchComponent} from "../search/search.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {BookCarrouselComponent} from "../book-carrousel/book-carrousel.component";
import {Book} from "../model/book";
import {firebaseRepository} from "../services/firebaseRepository";
import {BookListComponent} from "../book-list/book-list.component";


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    SearchComponent,
    RouterOutlet,
    BookCarrouselComponent,
    RouterLink,
    BookListComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  fetchingBooks: boolean = false;

  allBooks: Book[] = []
  bestSellerBooks: any = []
  slides: any = []
  constructor(private firebaseRepository: firebaseRepository) { }

  async ngOnInit() {
    if (!this.fetchingBooks) {
      this.fetchingBooks = true;
      this.slides = [];
      this.bestSellerBooks = [];
      this.allBooks = [];

      try {
        const booksObservablePromise = this.firebaseRepository.getAllBooks();
        const booksObservable = await booksObservablePromise;

        booksObservable.subscribe({
          next: (books: Book[]) => {
            this.allBooks = books;
            this.generateSlides(this.slides, 3)
            this.generateSlides(this.bestSellerBooks, 5)
            this.fetchingBooks = false;
          },
          error: (error) => {
            console.error('Error al obtener los libros:', error)
            this.fetchingBooks = false;
          }
        });
      } catch (error) {
        console.error('Error al obtener los libros:', error);
      }
    }
  }

  private generateSlides(arrayBooks: any, numberSlides: number) {
    // console.log(arrayBooks);
    for (let i = 0; i < numberSlides; i++) {
      const randomIndex = Math.floor(Math.random() * this.allBooks.length);
      const randomBook = this.allBooks[randomIndex];
      arrayBooks.push({
        'id': randomBook.id,
        'imagen': randomBook.imagen,
        'titulo': randomBook.titulo,
        'autor': randomBook.autor,
        'precio': randomBook.precio
      });
    }
  }
}
