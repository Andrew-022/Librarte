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
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../services/cart-service.service";


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
  book: Book | undefined;
  error=false;
  constructor(private cartservice: CartService,private route: ActivatedRoute,private dialogRef: MatDialog ,private databaseService: UserJsonService, private firebase: firebaseRepository) { }

  openDialog(){
    this.dialogRef.open(PopUpReviewComponent, {
      data: this.book
    });
  }
  ngOnInit(): void {

    // this.databaseService.getReviews()
    //   .subscribe((response: any) => {
    //     this.reviews = response;
    //     console.log("respuesta" + response);
    //     console.log("reviews" + this.reviews[0].picture);
    //   });

    this.route.paramMap.subscribe(async params => {
      const id = params.get('id'); // Obtener el valor de 'id' de los parámetros
      if (id !== null) { // Verificar que 'id' no sea nulo
        this.id = id; // Asignar 'id' solo si no es nulo

        // Obtén el libro correspondiente al nuevo id
        if (this.id) {
          this.book = await this.firebase.getBookById(this.id);
          if (!this.book) {
            this.error = true;
          }
        }
        window.scrollTo(0, 0);
        // Actualiza las reseñas cada vez que cambia el id
        this.firebase.getReviews(this.id).subscribe(reviews => {
          this.reviews = reviews;
        });
      }
    });
  }

  addbooktocart(){
    if(this.book){
      this.cartservice.addToCart(this.book.id);
    }
  }

  addbook(){
    this.firebase.addEmptyBook();
  }

  addauthor(){
    this.firebase.addEmptyAuthor();
  }

//   this.databaseService.getBooks("assets/search.json")
// .subscribe((response: any) => {
//   this.books =  response.books.filter((book: Book) => this.author.works.includes(book.id));
// });


}
