  import { Component, Input } from '@angular/core';
import {Book} from "../model/book";
  import {NgClass} from "@angular/common";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  @Input() book!: Book;
  @Input() cartView: boolean = false;
}
