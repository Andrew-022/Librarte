import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {firebaseRepository} from "../services/firebaseRepository";
import {Book} from "../model/book";

@Component({
  selector: 'app-book-carrousel',
  standalone: true,
  imports: [SlickCarouselModule],
  templateUrl: './book-carrousel.component.html',
  styleUrl: './book-carrousel.component.css'
})
export class BookCarrouselComponent implements OnInit{
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '.arrow-prev',
    nextArrow: '.arrow-next',
  };

  books: Book[] = []
  slides:any = []
  constructor(private firebaseRepository: firebaseRepository) { }

  async ngOnInit() {
    try {
      const booksObservablePromise = this.firebaseRepository.getAllBooks();
      const booksObservable = await booksObservablePromise;
      booksObservable.subscribe({
        next: (books: Book[]) => {
          this.books = books;
          this.generateSlides()
        },
        error: (error) => {
          console.error('Error al obtener los libros:', error)
        }
      });
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  }

  private generateSlides() {
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * this.books.length);
      const randomBook = this.books[randomIndex];
      this.slides.push({'id': randomBook.id, 'img': randomBook.imagen, 'title': randomBook.titulo});
    }
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

}
