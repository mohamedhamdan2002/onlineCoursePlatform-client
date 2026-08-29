import { Component, input,  } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-learning-stats',
  imports: [
    MatIcon
  ],
  templateUrl: './learning-stats.component.html',
  styleUrl: './learning-stats.component.scss',
  host: {
    class: 'block'
  }
})
export class LearningStatsComponent {
  totalCoursesCompleted = input(150);
  totalCoursesEnrolled  = input(11);
  totalHoursLearned = input(156);
  averageProgress = input(90)
  // averageProgress = computed(() => {
  //   const list = this.enrolledCourses();
  //   if (!list.length) return 0;

  //   return Math.round(
  //     list.reduce((acc, c) => acc + Math.random(), 0) / list.length
  //   );
  // });
}
