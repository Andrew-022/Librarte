import {Component, Input} from '@angular/core';
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

}
