import { Component, inject } from '@angular/core';
import { LearningStatsComponent } from './learning-stats/learning-stats.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EnrollmentStore } from '../../core/stores/enrollment.store';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Enrollment } from '../../core/models/courses/enrollment';
import { CommonModule } from '@angular/common';
import { EnrollmentCourseGridComponent } from './enrollment-course-grid/enrollment-course-grid.component';
import { ContinueWatchingCardComponent } from './continue-watching-card/continue-watching-card.component';

@Component({
  selector: 'app-student-dashboard',
  imports: [
    LearningStatsComponent,
    MatProgressBarModule,
    MatTabsModule,
    MatIconModule,
    CommonModule,
    EnrollmentCourseGridComponent,
    ContinueWatchingCardComponent
],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent {
  enrollmentStore = inject(EnrollmentStore);
  router = inject(Router);
  constructor() {
    this.enrollmentStore.loadMyEnrollments();
  }

  onContinueWatchingClick(enrollment: Enrollment) {
    this.router.navigate(['/course-player', enrollment.id]);
  }
  

  // enrolledCourses = signal(enrolledCourses);
  // completedCourses = signal(completedCourses);
  // all = [...this.enrolledCourses(), ...this.completedCourses()];
  // totalCoursesEnrolled = computed(() =>
  //   this.enrolledCourses().length + this.completedCourses().length
  // );

  // totalCoursesCompleted = computed(() =>
  //   this.completedCourses().length
  // );

  // totalHoursLearned = signal(156);

  // averageProgress = computed(() => {
  //   const list = this.enrolledCourses();
  //   if (!list.length) return 0;

  //   return Math.round(
  //     list.reduce((acc, c) => acc + Math.random(), 0) / list.length
  //   );
  // });
}
