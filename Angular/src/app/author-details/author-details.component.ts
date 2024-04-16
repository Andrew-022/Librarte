import { Component } from '@angular/core';
import {author} from "../model/author";
import {BookComponent} from "../book/book.component";
import {Book} from "../model/book";
import {UserJsonService} from "../services/user-json.service";
import {last} from "rxjs";


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
  author: author = {
    id:1,
    name: "J.K. Rowling",
    biography: "La escritora británica Joanne Kathleen Rowling se hizo célebre con su serie de novelas dedicadas a las aventuras de Harry Potter, uno de los mayores fenómenos literarios de la historia. Las peripecias de un niño huérfano con poderes mágicos capaz de evadirse a voluntad a un mundo de fantasía consiguieron batir todos los récords de ventas en la literatura del género, aunque muchos críticos se mostraron reacios a encasillar los libros de Rowling como cuentos para niños, como ocurriera con el famoso Tom Sawyer de Mark Twain.",
    cover:"https://imagessl.casadellibro.com/img/autores/jkrowling.jpg",
    works:[1,2,3,4],
  };

  books: Book[] = [];
  constructor(private databaseService: UserJsonService) { }
  ngOnInit(): void {
    this.databaseService.getBooks("assets/search.json")
        .subscribe((response: any) => {
          this.books = response.books;
        });
  }

  protected readonly last = last;
}
