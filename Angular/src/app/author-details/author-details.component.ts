import {Component, Input} from '@angular/core';
import {author} from "../model/author";
import {BookComponent} from "../book/book.component";
import {Book} from "../model/book";
import {UserJsonService} from "../services/user-json.service";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {firebaseRepository} from "../services/firebaseRepository";
import {ActivatedRoute} from "@angular/router";


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
  @Input() authorid!: string;
  author: author | undefined;
  books: Book[] = [];
  constructor(private route: ActivatedRoute,private databaseService: UserJsonService, private firebase: firebaseRepository) { }
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


    const id= this.route.snapshot.paramMap.get('authorid');
    if(id){ this.authorid=id;}

    try {
      this.author = await this.firebase.getAuthorById(this.authorid);

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
