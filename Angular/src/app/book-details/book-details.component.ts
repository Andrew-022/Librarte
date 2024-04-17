import { Component } from '@angular/core';
import {Book} from "../model/book";
import {BookComponent} from "../book/book.component";

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    BookComponent
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  book: Book = {
    id: "3",
    titulo: "Harry Potter y la piedra filosofal",
    sinopsis: "El día en que cumple once años, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado poderes mágicos. Deberá acudir entonces a una famosa escuela de magia y hechicería: Howards.",
    score:3,
    nReviews: 150,
    publicationDate: 2020,
    precio: 34.15,
    num_pag: 368,
    language: "Castellano",
    isbn: 9788418174070,
    encuadernacion:"Taba Dura",
    editorial: "Salamandra Infantil y Juvenil",
    imagen: "/assets/books/bookCover/HarryPotter.jpg",
    autor: "J.K. Rowling",
    author_id: "3",
    alto: 19,
    ancho: 12.6,
    grueso: 1.7,
    peso: 215
  }

}
