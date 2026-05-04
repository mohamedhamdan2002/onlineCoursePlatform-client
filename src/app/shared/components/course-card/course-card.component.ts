import { Component, input } from '@angular/core';
import { MaterialModule } from "../../material.module";
import { MatDivider } from "@angular/material/divider";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Course } from '../../../core/models/courses/course';

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
  navigateTo = input<string>();
}
