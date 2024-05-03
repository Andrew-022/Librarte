import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CartItem } from "../model/cart-item";
import {BookComponent} from "../book/book.component";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    BookComponent
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  @Output() quantityChanged = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();
  increaseQuantity() {
    this.cartItem.quantity++;
    this.quantityChanged.emit(this.cartItem.quantity);
  }

  decreaseQuantity() {
    if (this.cartItem.quantity > 1) {
      this.cartItem.quantity--;
      this.quantityChanged.emit(this.cartItem.quantity);
    }
  }
  removeCartItem() {
    this.remove.emit();
  }
}
