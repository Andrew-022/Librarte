import { Component } from '@angular/core';
import {author} from "../model/author";
import {BookComponent} from "../book/book.component";
import {Book} from "../model/book";
import {UserJsonService} from "../services/user-json.service";
import {last} from "rxjs";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";


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
  author: author = { id: 0, name: '', biography: '', cover:'' , works: [] };
  books: Book[] = [];
  constructor(private databaseService: UserJsonService) { }
  ngOnInit(): void {
    this.databaseService.getAuthor()
      .subscribe((response: any) => {
        this.author = response;
      });
    this.databaseService.getBooks("assets/search.json")
        .subscribe((response: any) => {
          this.books =  response.books.filter((book: Book) => this.author.works.includes(book.id));
        });
  }

  protected readonly last = last;
}
