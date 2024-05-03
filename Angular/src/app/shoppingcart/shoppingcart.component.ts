import { Component } from '@angular/core';
import {Book} from "../model/book";
import {UserJsonService} from "../services/user-json.service";
import {BookComponent} from "../book/book.component";
import {CartItem} from "../model/cart-item";
import {CurrencyPipe} from "@angular/common";
import {CartItemComponent} from "../cart-item/cart-item.component";
import {CartService} from "../services/cart-service.service";
import {firebaseRepository} from "../services/firebaseRepository";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import { Router } from '@angular/router';

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

  constructor(private databaseService: UserJsonService, private cartService: CartService, private firebaseRepository: firebaseRepository,
              private authService: FirebaseAuthService, private router: Router) { }
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items.slice(); // Crear una copia del array para asegurar la detección de cambios
      this.calculateSubtotal();
    });
  }

  async calculateSubtotal(): Promise<void> {
    this.subtotal = 0;
    for (const cartItem of this.cartItems) {
      const book = await this.firebaseRepository.getBookById(cartItem.bookId);
      if (book) {
        this.subtotal += book.precio * cartItem.quantity;
      }
    }
    this.total = this.subtotal + 2.99;
  }

  updateCartItemQuantity(newQuantity: number, index: number) {
    this.cartItems[index].quantity = newQuantity;
    this.calculateSubtotal();
  }

  removeCartItem(index: number) {
    this.cartItems.splice(index, 1); // Eliminar el cartItem del arreglo cartItems
    this.calculateSubtotal(); // Volver a calcular el subtotal
  }

  async onPay() {
    this.authService.user$.subscribe(user => {
      if (user) {
        // Usuario autenticado, mostrar aviso de compra completada
        console.log(user)
        alert('¡Compra completada!');
      } else {
        this.router.navigate(['login']);
      }
    });
  }
  useJSON(){
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
}
