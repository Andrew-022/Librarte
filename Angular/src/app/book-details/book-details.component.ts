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
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    BookComponent,
    AuthorDetailsComponent,
    ReviewComponent,
    NgForOf
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  id: string = "2";
  reviews: review[] = [];
  book!: Book;
  constructor(private dialogRef: MatDialog ,private databaseService: UserJsonService, private firebase: firebaseRepository) { }

  openDialog(){
    this.dialogRef.open(PopUpReviewComponent, {
      data: this.book // Aquí pasas el parámetro al componente
    });
  }
  ngOnInit(): void {
    this.databaseService.getBookById(this.id)
        .subscribe((response: any) => {
          this.book=response;
        })

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
