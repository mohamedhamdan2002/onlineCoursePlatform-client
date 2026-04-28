import { Component, computed } from '@angular/core';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-rating-summary',
  imports: [
    StarRatingComponent
  ],
  templateUrl: './rating-summary.component.html',
  styleUrl: './rating-summary.component.scss',
})
export class RatingSummaryComponent {
  courseRating = 4.5;
  reviewsCount = 10;
  ratingBreakdown = computed(() =>  {
    return [
      {
        stars: 1,
        count: 0,
        percentage: 0,
      },
      {
        stars: 2,
        count: 0,
        percentage: 0,
      },
      {
        stars: 3,
        count: 0,
        percentage: 0,
      },
      {
        stars: 4,
        count: 0,
        percentage: 0,
      },
      {
        stars: 5,
        count: 0,
        percentage: 0,
      },
    ]
  })
}
