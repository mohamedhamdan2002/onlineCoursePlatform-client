import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs'
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { CourseCurriculumComponent } from './course-curriculum/course-curriculum.component';
import { CourseReviewsComponent } from './course-reviews/course-reviews.component';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CourseStore } from '../../core/stores/course.store';
import { AuthStore } from '../../core/stores/auth.store';
import { LoginComponent } from '../auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-view-course-details',
  imports: [
    MatIcon,
    MatDivider,
    MatButton,
    MatTab,
    MatTabGroup,
    CourseOverviewComponent,
    CourseCurriculumComponent,
    CourseReviewsComponent,
    RouterLink,
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
],
  templateUrl: './view-course-details.component.html',
  styleUrl: './view-course-details.component.scss',
})
export class ViewCourseDetailsComponent implements OnInit {
  courseId = input.required<string>();
  store = inject(CourseStore);
  isInWishlist = signal<boolean>(false);
  router = inject(Router);
  authStore = inject(AuthStore);
  dialog = inject(MatDialog);
  constructor() {
    effect(() => {
      console.log("effect method runs..");
      this.store.loadSelectedCourse(this.courseId());
      this.isInWishlist.set(this.store.wishlistCourses().has(this.courseId()));
    });

  }
  ngOnInit(): void {
    // console.log("ngOnInit: ");
    // console.log(this.courseId());
    // this.store.setCourseId(this.courseId);
    // this.store.loadSelectedCourse(this.courseId());
  }

  addOrRemoveFromWishlist() {
    if(this.isInWishlist()){
      this.store.removeFromWishlist(this.store.selectedCourse()!);
    }else {
      this.store.addToWishlist(this.store.selectedCourse()!);
    }
  }
  onEnrollClick() {
    if (!this.authStore.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(() => {
        if (this.authStore.isAuthenticated()) {
          this.router.navigate(['/checkout', this.courseId()]);
        }
      });
      return;
    }
    this.router.navigate(['/checkout', this.courseId()]);
  }
  private route = inject(ActivatedRoute);

  readonly stars = [1, 2, 3, 4, 5];

  readonly reviewStats = [
    { stars: 5, value: 75 },
    { stars: 4, value: 20 },
    { stars: 3, value: 5 },
    { stars: 2, value: 2 },
    { stars: 1, value: 1 },
  ];

  readonly learnItems = [
    'Build responsive web applications',
    'Master Angular and TypeScript',
    'Create REST APIs and integrations',
    'Work with authentication and authorization',
    'Deploy applications to production',
    'Use clean architecture patterns',
  ];

  readonly course = signal({
    id: '1',
    title: 'Complete Angular Bootcamp',
    instructor: 'Sarah Johnson',

    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',

    rating: 4.8,
    reviewsCount: 12543,
    studentsCount: 45230,
    isEnrolled: true,

    duration: '42 hours',
    level: 'Beginner',

    price: 89.99,

    category: {
      id: '1',
      name: 'Development',
    },

    sections: [
      {
        id: '1',
        title: 'Getting Started',
        lessons: [
          {
            id: '1',
            title: 'Welcome to the Course',
            type: 'video',
            duration: '5:20',
          },
          {
            id: '2',
            title: 'Angular Overview',
            type: 'video',
            duration: '10:12',
          },
        ],
      },
      {
        id: '2',
        title: 'Angular Fundamentals',
        lessons: [
          {
            id: '3',
            title: 'Components & Templates',
            type: 'video',
            duration: '18:30',
          },
          {
            id: '4',
            title: 'Dependency Injection',
            type: 'article',
            duration: '8:00',
          },
        ],
      },
    ],
  });

  readonly progress = signal(65);

  readonly totalLessons = computed(() =>
    this.course()
      .sections
      .reduce((acc, section) => acc + section.lessons.length, 0)
  );
}
