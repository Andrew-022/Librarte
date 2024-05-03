import { Component, OnInit } from '@angular/core';
import { Book } from "../model/book";
import { Observable } from "rxjs";
import { firebaseRepository } from "../services/firebaseRepository";
import { BookComponent } from "../book/book.component";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    BookComponent,
    MatMenuTrigger,
    MatMenu
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  books: Book[] = [];
  sorts: string[] = ["Mas valorados", "Titulo A-Z", "Titulo Z-A", "Precio ascendente", "Precio descendente"];
  categories: string[] = ["Todas las categorias","Imprescindibles", "Fición", "Cómic y Manga", "No ficción", "Infantil", "Fantasía"];
  selectedCategoryIndex: number = 0;
  selectedSortIndex: number = 0;
  constructor(private firebaseRepository: firebaseRepository) { }

  ngOnInit(): void {
    this.firebaseRepository.getAllBooks()
      .then((booksObservable: Observable<Book[]>) => {
        booksObservable.subscribe((books: Book[]) => {
          this.books = books;
        });
      })
      .catch((error) => {
        console.error("Error al obtener los libros:", error);
      });
  }

  selectCategory(index: number): void {
    this.selectedCategoryIndex = index;
    // Aquí puedes hacer cualquier otra cosa que necesites cuando se selecciona una categoría
  }

  selectSort(index: number): void {
    this.selectedSortIndex = index;
  }
}
