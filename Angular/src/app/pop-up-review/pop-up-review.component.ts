import {Component, Inject, Input} from '@angular/core';
import {Book} from "../model/book";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-pop-up-review',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './pop-up-review.component.html',
  styleUrl: './pop-up-review.component.css'
})
export class PopUpReviewComponent {
  selectedStars  = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  rate(star: number){
    this.selectedStars =star;
  }
}
