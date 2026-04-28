import { Component } from '@angular/core';
import { RatingSummaryComponent } from '../rating-summary/rating-summary.component';
import { ReviewItemComponent } from '../review-item/review-item.component';

@Component({
  selector: 'app-course-reviews',
  imports: [
    RatingSummaryComponent,
    ReviewItemComponent
  ],
  templateUrl: './course-reviews.component.html',
  styleUrl: './course-reviews.component.scss',
})
export class CourseReviewsComponent {

}
