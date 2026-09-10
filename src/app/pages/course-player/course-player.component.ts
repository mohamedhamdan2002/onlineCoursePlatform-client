import { Component, signal, computed, input, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { VideoPlayerComponent } from '../../shared/components/video-player/video-player.component';
import { Lecture } from '../../core/models/courses/lecture';
import { EnrollmentStore } from '../../core/stores/enrollment.store';
import { Section } from '../../core/models/courses/section';

@Component({
  selector: 'app-course-player',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressBarModule,
    MatExpansionModule,
    VideoPlayerComponent
  ],
  templateUrl: './course-player.component.html'
})
export class CoursePlayerComponent {
  enrollmentId = input.required<string>();
  enrollmentStore = inject(EnrollmentStore);
  videoUrl = signal<string | null>(null);
  currentLecture = signal<string | null>(null);
  selectedLecture = signal<Lecture | null>(null);
  constructor() {
    effect(() => {
      this.videoUrl.set(null);
      this.currentLecture.set(null);
      this.selectedLecture.set(null)
      this.enrollmentStore.loadMyEnrollmentById(this.enrollmentId());
    });
    effect(() => {
      const enrollment = this.enrollmentStore.selectedEnrollment();

      if (!enrollment?.id || enrollment.id !== this.enrollmentId()) {
        return;
      }

      const lecture = enrollment.course.sections
        .flatMap(section => section.lectures)
        .find(lecture =>
          lecture.id === enrollment.continueLectureId
        );

      const selectedLecture =
        lecture ?? enrollment.course.sections[0]?.lectures[0];

      if (!selectedLecture) {
        return;
      }

      this.currentLecture.set(selectedLecture.id);
      this.selectedLecture.set(selectedLecture);
      this.videoUrl.set(selectedLecture.videoUrl);
    });
    effect(() => {
      if (!this.enrollmentStore.lectureCompletionSuccess()) {
        return;
      }

      this.next();

      this.enrollmentStore.resetLectureCompletionSuccess();
    });
  }

  enrollment = computed(() =>
    this.enrollmentStore.selectedEnrollment()
  );

  course = computed(() =>
    this.enrollment()?.course
  );
  allLectures = computed(() =>
    this.course()?.sections.flatMap(
      section => section.lectures
    ) ?? []
  );
  openLectureVideo(lecture: Lecture) {
    this.videoUrl.set(lecture.videoUrl);
    this.currentLecture.set(lecture.id);
    this.selectedLecture.set(lecture);

    this.enrollmentStore.updateLastAccessedLecture(
      lecture.id
    );
  }




  showSidebar = signal(true);




  currentIndex = computed(() =>
    this.allLectures().findIndex(
      lecture => lecture.id === this.currentLecture()
    )
  );

  hasNext = computed(() =>
    this.currentIndex() >= 0 &&
    this.currentIndex() < this.allLectures().length - 1
  );

  hasPrevious = computed(() =>
    this.currentIndex() > 0
  );



  next() {
    if (this.hasNext()) {
      const next = this.allLectures()[this.currentIndex() + 1];
      this.openLectureVideo(next);
    }
  }
  completeAndContinue() {
    if(this.currentLecture() === null )
      return;
  this.enrollmentStore.markLectureCompleted(
    this.currentLecture()!
  );
}

  prev() {
    if (this.hasPrevious()) {
      const prev = this.allLectures()[this.currentIndex() - 1];
      this.openLectureVideo(prev);
    }
  }



  isCurrentSection(section: Section): boolean {
    return section.lectures.some(
      lecture => lecture.id === this.currentLecture()
    );
  }

  toggleSidebar() {
    this.showSidebar.set(!this.showSidebar());
  }
}
