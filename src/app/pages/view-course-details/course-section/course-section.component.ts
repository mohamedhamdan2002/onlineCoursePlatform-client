import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { Section } from '../../../core/models/courses/section';
import { CourseStore } from '../../../core/stores/course.store';

@Component({
  selector: 'app-course-section',
  imports: [
    MatExpansionModule,
    MatButton,
    MatListModule,
    MatIcon,
    RouterLink
  ],
  templateUrl: './course-section.component.html',
  styleUrl: './course-section.component.scss',
})
export class CourseSectionComponent {
  section = input.required<Section>();
  store = inject(CourseStore);
}
