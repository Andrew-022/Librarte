import { Component, OnInit } from '@angular/core';
import { Book } from "../model/book";
import { Observable } from "rxjs";
import { firebaseRepository } from "../services/firebaseRepository";
import { BookComponent } from "../book/book.component";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {category} from "../model/category";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    BookComponent,
    MatMenuTrigger,
    MatMenu,
    RouterLink
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {


  databasecategory: { [key: string]: string } = {
    "Infantil": "9cGgifMQBybm3B2flwtN",
    "Fantasía": "Q1hY2MeNXAABIjW0MsU8",
    "Ficción": "O3DELaHxEhExm7uEaK0D",
    "No Ficción": "EmDC0UAfWMLChBfKRLV2",
    "Cómic y Manga": "uWqmqJ59M0LcruEFmYEA",
    "Imprescindibles": "KymtrxhXAFAuHYhlKvvm",
  };
  books: Book[] = [];
  category: category | undefined;
  sorts: string[] = ["Mas valorados", "Titulo A-Z", "Titulo Z-A", "Precio ascendente", "Precio descendente"];
  categories: string[] = ["Todas las categorias","Imprescindibles", "Ficción", "Cómic y Manga", "No Ficción", "Infantil", "Fantasía"];
  selectedCategoryIndex: number = 0;
  selectedSortIndex: number = 0;
  constructor(private route: ActivatedRoute, private firebaseRepository: firebaseRepository) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      const category = params.get('category');
      console.log("entro")
      if (category) {
        this.selectedCategoryIndex = this.categories.indexOf(category);

        if(this.selectedCategoryIndex==0){
          this.firebaseRepository.getAllBooks()
            .then((booksObservable: Observable<Book[]>) => {
              booksObservable.subscribe((books: Book[]) => {
                this.books = books;
              });
            })
            .catch((error) => {
              console.error("Error al obtener los libros:", error);
            });
          return
        }

        this.category = await this.firebaseRepository.getCategoryById(this.databasecategory[this.categories[this.selectedCategoryIndex]]);
        if (!this.category) {
          console.log("No se encontró ninguna categoria con el ID proporcionado.");
          return;
        }
        this.books = []; // Reiniciar el array de libros para evitar duplicados
        for (const id of this.category.books) {
          const book = await this.firebaseRepository.getBookById(id);
          if (book) {
            this.books.push(book);
          } else {
            console.log("No se encontró ningún libro con el ID proporcionado:", id);
          }
        }
      }
    });
  }

  selectSort(index: number): void {
    this.selectedSortIndex = index;
    switch(index) {
      case 0: // "Mas valorados"
        this.books.sort((a, b) => b.score - a.score);
        break;
      case 1: // "Titulo A-Z"
        this.books.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 2: // "Titulo Z-A"
        this.books.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
      case 3: // "Precio ascendente"
        this.books.sort((a, b) => a.precio - b.precio);
        break;
      case 4: // "Precio descendente"
        this.books.sort((a, b) => b.precio - a.precio);
        break;
      default:
        break;
    }
  }
}
