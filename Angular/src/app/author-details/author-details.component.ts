import { Component } from '@angular/core';
import {author} from "../model/author";
import {BookComponent} from "../book/book.component";
import {Book} from "../model/book";
import {UserJsonService} from "../services/user-json.service";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {firebaseRepository} from "../services/firebaseRepository";


@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [
    BookComponent
  ],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  author: author | undefined;
  books: Book[] = [];
  constructor(private databaseService: UserJsonService, private firebase: firebaseRepository) { }
  async ngOnInit(): Promise<void> {

    // this.firebase.getAuthors()
    //   .subscribe((response: any) => {
    //     this.author =  response[0]
    //     console.log(response)
    //   });

    // this.databaseService.getAuthor()
    //   .subscribe((response: any) => {
    //     this.author = response;
    //   });

    try {
      this.author = await this.firebase.getAuthorById("iXcGKStBF26pY7gs5GCS");

      if (!this.author) {
        console.log("No se encontró ningún autor con el ID proporcionado.");
        return;
      }

      for (const id of this.author.works) {
        const book = await this.firebase.getBookById(id);
        if (book) {
          this.books.push(book);
        } else {
          console.log("No se encontró ningún libro con el ID proporcionado:", id);
        }
      }
    } catch (error) {
      console.error("Error al obtener detalles del autor o libros:", error);
    }
  }
}
