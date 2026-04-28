import { Component, inject } from '@angular/core';
import { CourseCardComponent } from '../../shared/components/course-card/course-card.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EmptyWishlistComponent } from './empty-wishlist/empty-wishlist.component';
import { CommonModule } from '@angular/common';
import { CourseStore } from '../../core/stores/course.store';

@Component({
  selector: 'app-wishlist',
  imports: [
    CourseCardComponent,
    MatButton,
    MatIconButton,
    MatIcon,
    EmptyWishlistComponent,
    CommonModule
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  store = inject(CourseStore);
}
