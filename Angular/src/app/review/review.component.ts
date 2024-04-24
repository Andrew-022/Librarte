import {Component, Input} from '@angular/core';
import {review} from "../model/reviews";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-review',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() review!: review;
}
