import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Book} from "../model/book";
import {firebaseRepository} from "../services/firebaseRepository";

@Component({
  selector: 'app-book-list',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {

  bookList: any[] = []
  @Input()
  numberOfBooks: number = 3

  constructor(private firebaseRepository: firebaseRepository) { }
  async ngOnInit() {
    try {
      const booksObservablePromise = this.firebaseRepository.getAllBooks();
      const booksObservable = await booksObservablePromise;
      booksObservable.subscribe({
        next: (books: Book[]) => {
          this.generateSlides(books, this.numberOfBooks)
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
      const randomIndex = Math.floor(Math.random() * arrayBooks.length);
      const randomBook = arrayBooks[randomIndex];
      this.bookList.push({
        'id': randomBook.id,
        'imagen': randomBook.imagen,
        'titulo': randomBook.titulo,
        'autor': randomBook.autor,
        'precio': randomBook.precio
      });
    }
  }
}
