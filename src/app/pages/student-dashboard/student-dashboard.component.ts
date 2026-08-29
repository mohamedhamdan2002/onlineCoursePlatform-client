import { Component, computed, inject, signal } from '@angular/core';
import { LearningStatsComponent } from './learning-stats/learning-stats.component';
import { CourseCardComponent } from "../../shared/components/course-card/course-card.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EnrollmentStore } from '../../core/stores/enrollment.store';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
const enrolledCourses = [
    {
      id: "c909ec69-c7a4-43ab-9a98-352362a2416d",
      title: "Full-Stack Web Development Bootcamp",
      imageUrl: "images/2d88b674-5846-45c5-8cd9-07ceb93e6a89.png",
      instructor: "Admin site.com",
      level: "Advanced",
      price: 129.99,
      isEnrolled: false,
      category: {
        id: "d272c993-4741-4cd2-a600-76cdafe96ab2",
        name: "Development"
      },
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      sections: [],
      duration: ""
    },
    {
      id: "1974c3a2-2f7d-4b2f-a72f-3fd4ee6e3347",
      title: "JavaScript Deep Dive",
      imageUrl: "images/41f4f079-a0bf-42a4-9009-eee597ee3a48.png",
      instructor: "Admin site.com",
      level: "Intermediate",
      price: 59.99,
      isEnrolled: false,
      category: {
        id: "ef765f7a-051c-4457-921a-5212ba61ce99",
        name: "Programming"
      },
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      sections: [],
      duration: ""
    },
    {
      id: "95f5cd28-6660-4289-9f15-92dad143f087",
      title: "Angular From Zero to Hero",
      imageUrl: "images/41b148f6-97b5-477a-bc0e-e3123f3e9553.png",
      instructor: "Admin site.com",
      level: "Beginner",
      price: 79.99,
      isEnrolled: false,
      category: {
        id: "d272c993-4741-4cd2-a600-76cdafe96ab2",
        name: "Development"
      },
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      sections: [],
      duration: ""
    }
];

const completedCourses =
  [
    {
      id: "c909ec69-c7a4-43ab-9a98-352362a2416d",
      title: "Full-Stack Web Development Bootcamp",
      imageUrl: "images/2d88b674-5846-45c5-8cd9-07ceb93e6a89.png",
      instructor: "Admin site.com",
      level: "Advanced",
      price: 129.99,
      isEnrolled: false,
      category: {
        id: "d272c993-4741-4cd2-a600-76cdafe96ab2",
        name: "Development"
      },
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      sections: [],
      duration: ""
    },
    {
      id: "1974c3a2-2f7d-4b2f-a72f-3fd4ee6e3347",
      title: "JavaScript Deep Dive",
      imageUrl: "images/41f4f079-a0bf-42a4-9009-eee597ee3a48.png",
      instructor: "Admin site.com",
      level: "Intermediate",
      price: 59.99,
      isEnrolled: false,
      category: {
        id: "ef765f7a-051c-4457-921a-5212ba61ce99",
        name: "Programming"
      },
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      sections: [],
      duration: ""
    },
    {
      id: "95f5cd28-6660-4289-9f15-92dad143f087",
      title: "Angular From Zero to Hero",
      imageUrl: "images/41b148f6-97b5-477a-bc0e-e3123f3e9553.png",
      instructor: "Admin site.com",
      level: "Beginner",
      price: 79.99,
      isEnrolled: false,
      category: {
        id: "d272c993-4741-4cd2-a600-76cdafe96ab2",
        name: "Development"
      },
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      sections: [],
      duration: ""
    }
];
@Component({
  selector: 'app-student-dashboard',
  imports: [
    LearningStatsComponent,
    CourseCardComponent,
    MatProgressBarModule,
    MatTabsModule,
    MatIconModule
],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent {
  enrollmentStore = inject(EnrollmentStore);
  constructor() {
    this.enrollmentStore.loadMyEnrollments();
  }


  enrolledCourses = signal(enrolledCourses);
  completedCourses = signal(completedCourses);
  all = [...this.enrolledCourses(), ...this.completedCourses()];
  totalCoursesEnrolled = computed(() =>
    this.enrolledCourses().length + this.completedCourses().length
  );

  totalCoursesCompleted = computed(() =>
    this.completedCourses().length
  );

  totalHoursLearned = signal(156);

  averageProgress = computed(() => {
    const list = this.enrolledCourses();
    if (!list.length) return 0;

    return Math.round(
      list.reduce((acc, c) => acc + Math.random(), 0) / list.length
    );
  });
}
