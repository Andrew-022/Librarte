import {Component, Input} from '@angular/core';
import {review} from "../model/reviews";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() review!: review;
}
