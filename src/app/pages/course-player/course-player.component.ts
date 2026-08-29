import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
const courseData = {
  title: 'Complete Web Development Bootcamp',
  sections: [
    {
      title: 'Getting Started',
      lectures: [
        { id: 1, title: 'Welcome to the Course', duration: '5:23', completed: true },
        { id: 2, title: 'Setting Up Your Development Environment', duration: '12:45', completed: true },
        { id: 3, title: 'How to Get the Most Out of This Course', duration: '8:12', completed: false },
        { id: 4, title: 'Introduction to Web Development', duration: '15:30', completed: false },
      ],
    },
    {
      title: 'HTML Fundamentals',
      lectures: [
        { id: 5, title: 'Introduction to HTML', duration: '10:15', completed: false },
        { id: 6, title: 'HTML Tags and Elements', duration: '18:42', completed: false },
        { id: 7, title: 'Working with Forms', duration: '22:30', completed: false },
        { id: 8, title: 'Semantic HTML', duration: '15:20', completed: false },
      ],
    },
    {
      title: 'CSS Mastery',
      lectures: [
        { id: 9, title: 'CSS Basics and Selectors', duration: '16:45', completed: false },
        { id: 10, title: 'The Box Model', duration: '20:12', completed: false },
        { id: 11, title: 'Flexbox Layout', duration: '28:30', completed: false },
        { id: 12, title: 'CSS Grid', duration: '32:15', completed: false },
      ],
    },
    {
      title: 'JavaScript Essentials',
      lectures: [
        { id: 13, title: 'JavaScript Fundamentals', duration: '25:30', completed: false },
        { id: 14, title: 'DOM Manipulation', duration: '30:45', completed: false },
        { id: 15, title: 'ES6+ Features', duration: '35:20', completed: false },
        { id: 16, title: 'Async JavaScript', duration: '28:15', completed: false },
      ],
    },
  ],
};

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
    MatExpansionModule
  ],
  templateUrl: './course-player.component.html'
})
export class CoursePlayerComponent {

  currentLecture = signal(3);
  isPlaying = signal(false);
  showSidebar = signal(true);
  videoProgress = signal(45);

  courseData = courseData;

  allLectures = computed(() =>
    this.courseData.sections.flatMap(s => s.lectures)
  );

  currentLectureData = computed(() =>
    this.allLectures().find(l => l.id === this.currentLecture())
  );

  currentIndex = computed(() =>
    this.allLectures().findIndex(l => l.id === this.currentLecture())
  );

  hasNext = computed(() =>
    this.currentIndex() < this.allLectures().length - 1
  );

  hasPrevious = computed(() =>
    this.currentIndex() > 0
  );

  overallProgress = computed(() => {
    const list = this.allLectures();
    const done = list.filter(l => l.completed).length;
    return (done / list.length) * 100;
  });

  next() {
    if (this.hasNext()) {
      const next = this.allLectures()[this.currentIndex() + 1];
      this.currentLecture.set(next.id);
      this.videoProgress.set(0);
    }
  }

  prev() {
    if (this.hasPrevious()) {
      const prev = this.allLectures()[this.currentIndex() - 1];
      this.currentLecture.set(prev.id);
      this.videoProgress.set(0);
    }
  }

  selectLecture(id: number) {
    this.currentLecture.set(id);
  }

  togglePlay() {
    this.isPlaying.set(!this.isPlaying());
  }

  toggleSidebar() {
    this.showSidebar.set(!this.showSidebar());
  }
}
