import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CartItem} from "../model/cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  addToCart(bookId: string) {
    const currentCartItems = this.cartItemsSubject.getValue();
    const existingItem = currentCartItems.find(item => item.bookId === bookId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentCartItems.push({ bookId, quantity: 1 });
    }
    this.cartItemsSubject.next(currentCartItems);
  }
}
