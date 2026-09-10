import { Component, input, output } from "@angular/core";
import { EnrollmentCourseCardComponent } from "../enrollment-course-card/enrollment-course-card.component";
import { Enrollment } from "../../../core/models/courses/enrollment";

@Component({
  selector: 'app-enrollment-course-grid',
  standalone: true,
  imports: [
    EnrollmentCourseCardComponent
  ],
  templateUrl: './enrollment-course-grid.component.html'
})
export class EnrollmentCourseGridComponent {

  enrollments = input.required<Enrollment[]>();

  selected = output<Enrollment>();

  onSelected(enrollment: Enrollment) {
    this.selected.emit(enrollment);
  }
}
