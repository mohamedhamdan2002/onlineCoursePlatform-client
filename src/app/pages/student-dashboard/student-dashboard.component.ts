import { Component, inject } from '@angular/core';
import { LearningStatsComponent } from './learning-stats/learning-stats.component';
import { CourseCardComponent } from "../../shared/components/course-card/course-card.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EnrollmentStore } from '../../core/stores/enrollment.store';
@Component({
  selector: 'app-student-dashboard',
  imports: [
    LearningStatsComponent,
    CourseCardComponent,
    MatProgressBarModule
],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent {
  enrollmentStore = inject(EnrollmentStore);
  constructor() {
    this.enrollmentStore.loadMyEnrollments();
  }
}
