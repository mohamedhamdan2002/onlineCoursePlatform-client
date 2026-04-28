import { Component, input, signal, viewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Course } from '../../../features/courses/models/course';
import { CourseSectionComponent } from '../course-section/course-section.component';
@Component({
  selector: 'app-course-curriculum',
  imports: [
    MatExpansionModule,
    MatButton,
    MatListModule,
    MatIcon,
    CourseSectionComponent
  ],
  templateUrl: './course-curriculum.component.html',
  styleUrl: './course-curriculum.component.scss',
})
export class CourseCurriculumComponent {
  course = input.required<Course>();
  isExpanded = signal<boolean>(false);
  accordion = viewChild.required(MatAccordion);
  changeAccordionStatus() {
    if(this.isExpanded()) {
      this.accordion().closeAll();
    }else {
      this.accordion().openAll();
    }
    this.isExpanded.set(!this.isExpanded());
  }
}
