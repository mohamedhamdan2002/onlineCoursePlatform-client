import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Course } from '../../../core/models/courses/course';

@Component({
  selector: 'app-course-overview',
  imports: [
    MatIcon
  ],
  templateUrl: './course-overview.component.html',
  styleUrl: './course-overview.component.scss',
})
export class CourseOverviewComponent {
  course = input<Course>();
  readonly learnItems = [
    'Build responsive web applications',
    'Master Angular and TypeScript',
    'Create REST APIs and integrations',
    'Work with authentication and authorization',
    'Deploy applications to production',
    'Use clean architecture patterns',
  ];
}
