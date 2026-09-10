import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Enrollment } from '../../../core/models/courses/enrollment';
import { CourseCardComponent } from '../../../shared/components/course-card/course-card.component';

@Component({
  selector: 'app-enrollment-course-card',
  standalone: true,
  imports: [
    RouterModule,
    CourseCardComponent
  ],
  templateUrl: './enrollment-course-card.component.html'
})
export class EnrollmentCourseCardComponent {

  enrollment = input.required<Enrollment>();

  selected = output<Enrollment>();

  selectEnrollment() {
    this.selected.emit(this.enrollment());
  }
}
