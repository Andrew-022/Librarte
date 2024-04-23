import { Component } from '@angular/core';
import {Book} from "../model/book";
import {UserJsonService} from "../services/user-json.service";
import {BookComponent} from "../book/book.component";
import {last} from "rxjs";
import {CartItem} from "../model/cart-item";
import {CurrencyPipe} from "@angular/common";
import {CartItemComponent} from "../cart-item/cart-item.component";
import {remove} from "@angular/fire/database";

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [
    BookComponent,
    CurrencyPipe,
    CartItemComponent
  ],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css'
})
export class ShoppingcartComponent {
  books: Book[] = [];
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  total: number = 0;
  currencyCode: string = 'EUR';

  constructor(private databaseService: UserJsonService) { }
  ngOnInit(): void {
    this.databaseService.getBooks("assets/search.json")
      .subscribe((response: any) => {
        this.books = response.books;
        this.cartItems = this.books.map(book => ({
          bookId: book.id,
          quantity: 1
        }));
        this.calculateSubtotal();
      });
  }
  calculateSubtotal(): void {
    this.subtotal = 0;
    this.cartItems.forEach(cartItem => {
      const book = this.books.find(book => book.id === cartItem.bookId);
      if (book) {
        this.subtotal += book.precio * cartItem.quantity;
      }
    });
    this.total = this.subtotal + 2.99;
  }
  protected readonly last = last;

  updateCartItemQuantity(newQuantity: number, index: number) {
    this.cartItems[index].quantity = newQuantity;
    this.calculateSubtotal();
  }

  removeCartItem(index: number) {
    this.cartItems.splice(index, 1); // Eliminar el cartItem del arreglo cartItems
    this.calculateSubtotal(); // Volver a calcular el subtotal
  }

  protected readonly remove = remove;
}
