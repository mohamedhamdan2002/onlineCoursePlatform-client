import { Component, input } from '@angular/core';
import { MaterialModule } from "../../material.module";
import { MatDivider } from "@angular/material/divider";
import { Course } from '../../../features/courses/models/course';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-card',
  imports: [
    MaterialModule,
    MatDivider,
    CommonModule,
    RouterLink
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
  course = input.required<Course>();
}
