import { Component } from '@angular/core';
import { LearningStatsComponent } from './learning-stats/learning-stats.component';
import { CourseCardComponent } from "../../shared/components/course-card/course-card.component";
import { Course } from '../../features/courses/models/course';
import {MatProgressBarModule} from '@angular/material/progress-bar';
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
  courses: Course[] = [
  {
    id: '1',
    title: 'Angular From Zero to Hero',
    instructor: 'John Doe',
    imageUrl: 'https://picsum.photos/400/250?random=1',

    rating: 4.5,
    reviewsCount: 1200,
    studentsCount: 15000,

    duration: '36 hours',
    level: 'All Levels',

    price: 49.99,
    category: { id: 'c1', name: 'Web Development' },
    sections: [] // keep empty if required by interface
  },
  {
    id: '2',
    title: 'ASP.NET Core Web API Mastery',
    instructor: 'Ahmed Hassan',
    imageUrl: 'https://picsum.photos/400/250?random=2',

    rating: 4.7,
    reviewsCount: 980,
    studentsCount: 11000,

    duration: '28 hours',
    level: 'Intermediate',

    price: 59.99,
    category: { id: 'c2', name: '.NET Development' },
    sections: []
  },
  {
    id: '3',
    title: 'JavaScript Algorithms & Data Structures',
    instructor: 'Sarah Smith',
    imageUrl: 'https://picsum.photos/400/250?random=3',

    rating: 4.8,
    reviewsCount: 2100,
    studentsCount: 25000,

    duration: '40 hours',
    level: 'Beginner',

    price: 39.99,
    category: { id: 'c3', name: 'Computer Science' },
    sections: []
  },
  {
    id: '4',
    title: 'Clean Architecture in .NET',
    instructor: 'Mohamed Ali',
    imageUrl: 'https://picsum.photos/400/250?random=4',

    rating: 4.9,
    reviewsCount: 650,
    studentsCount: 8000,

    duration: '22 hours',
    level: 'Advanced',

    price: 69.99,
    category: { id: 'c2', name: '.NET Development' },
    sections: []
  }
];
}
