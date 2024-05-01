import {Component, OnInit} from '@angular/core';
import { UserJsonService } from "../services/user-json.service";
import {Book} from "../model/book";
import {BookComponent} from "../book/book.component";
import {FormsModule} from "@angular/forms";
import {firebaseRepository} from "../services/firebaseRepository";
import {Observable} from "rxjs";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    BookComponent,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  books: Book[] = [];
  filteredBooks: Book[] = []; // Libros filtrados
  searchTerm: string = ''; // Término de búsqueda

  constructor(private databaseService: UserJsonService, private firebaseRepository: firebaseRepository) { }
  ngOnInit(): void {
    // this.databaseService.getBooks("assets/search.json")
    //   .subscribe((response: any) => {
    //     this.books = response.books;
    //     this.filteredBooks = this.books;
    //   });
    this.firebaseRepository.getAllBooks()
      .then((booksObservable: Observable<Book[]>) => {
        booksObservable.subscribe((books: Book[]) => {
          this.books = books;
          this.filteredBooks = this.books;
        });
      })
      .catch((error) => {
        console.error("Error al obtener los libros:", error);
      });
  }

  filterBooks(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredBooks = this.books;
    } else {
      const searchTermNumber = parseFloat(this.searchTerm.trim());
      if (!isNaN(searchTermNumber)) {
        this.filteredBooks = this.books.filter(book =>
          book.isbn === searchTermNumber
        );
      } else {

        this.filteredBooks = this.books.filter(book =>
          book.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          book.autor.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    }
  }
}
