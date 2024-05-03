import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CartItem} from "../model/cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }
  addToCart(bookId: string) {
    const currentCartItems = this.cartItemsSubject.getValue();
    const existingItemIndex = currentCartItems.findIndex(item => item.bookId === bookId);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...currentCartItems];
      updatedCartItems[existingItemIndex].quantity++;
      this.cartItemsSubject.next(updatedCartItems);
    } else {
      const updatedCartItems = [...currentCartItems, { bookId, quantity: 1 }];
      this.cartItemsSubject.next(updatedCartItems);
    }

    this.saveCartToStorage(); // Guardar el carrito en el almacenamiento local después de cada modificación
  }

  private saveCartToStorage() {
    const cartItems = this.cartItemsSubject.getValue();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  private loadCartFromStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItemsSubject.next(JSON.parse(storedCartItems));
    }
  }
}
