import { Component } from '@angular/core';
import {Book} from "../model/book";
import {BookComponent} from "../book/book.component";
import {AuthorDetailsComponent} from "../author-details/author-details.component";
import {UserJsonService} from "../services/user-json.service";
import {firebaseRepository} from "../services/firebaseRepository";
import {review} from "../model/reviews";
import {ReviewComponent} from "../review/review.component";
import { MatDialog } from "@angular/material/dialog";
import {PopUpReviewComponent} from "../pop-up-review/pop-up-review.component";


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    BookComponent,
    AuthorDetailsComponent,
    ReviewComponent
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {

  reviews: review[] = [];
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
  constructor(private dialogRef: MatDialog ,private databaseService: UserJsonService, private firebase: firebaseRepository) { }

  openDialog(){
    this.dialogRef.open(PopUpReviewComponent, {
      data: this.book // Aquí pasas el parámetro al componente
    });
  }
  ngOnInit(): void {

    this.databaseService.getReviews()
      .subscribe((response: any) => {
        this.reviews =  response;
        console.log("respuesta"+response);
        console.log("reviews"+this.reviews[0].picture);
      });
  }

//   this.databaseService.getBooks("assets/search.json")
// .subscribe((response: any) => {
//   this.books =  response.books.filter((book: Book) => this.author.works.includes(book.id));
// });


}
