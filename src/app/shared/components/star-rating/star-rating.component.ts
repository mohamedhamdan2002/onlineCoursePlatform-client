import { Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  imports: [
    MatIcon
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  rating = input.required<number>();
  starArray = computed(() => {
    const  fullStars = Math.floor(this.rating());
    return Array(5).fill(false).map((_, index) => index < fullStars);
    // ex if rating 4 -> then fullStars 4
    // array -> [0, 0, 0, 0, 0] -> if index < fullStars then flip to 1 -> [1, 1, 1, 1, 0]
  });
}
