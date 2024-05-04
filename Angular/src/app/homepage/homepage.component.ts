import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SearchComponent} from "../search/search.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {BookCarrouselComponent} from "../book-carrousel/book-carrousel.component";
import {Book} from "../model/book";
import {firebaseRepository} from "../services/firebaseRepository";


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    SearchComponent,
    RouterOutlet,
    BookCarrouselComponent,
    RouterLink
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  allBooks: Book[] = []
  bestSellerBooks: any = []
  recommendedBooks: any = []
  newReleasesBooks: any = []
  slides: any = []
  constructor(private firebaseRepository: firebaseRepository) { }

  async ngOnInit() {
    try {
      const booksObservablePromise = this.firebaseRepository.getAllBooks();
      const booksObservable = await booksObservablePromise;
      booksObservable.subscribe({
        next: (books: Book[]) => {
          this.allBooks = books;
          this.generateSlides(this.slides, 3)
          this.generateSlides(this.bestSellerBooks, 5)
          this.generateSlides(this.recommendedBooks, 12)
          this.generateSlides(this.newReleasesBooks, 12)
        },
        error: (error) => {
          console.error('Error al obtener los libros:', error)
        }
      });
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  }

  private generateSlides(arrayBooks: any, numberSlides: number) {
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
