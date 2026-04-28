import { Component } from '@angular/core';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review-item',
  imports: [
    StarRatingComponent,
    DatePipe
  ],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.scss',
  host: {
    class: 'block'
  }
})
export class ReviewItemComponent {
  reviewDate = new Date();
}
