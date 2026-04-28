import { Component, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatDivider, MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CourseStore } from '../../../core/stores/course.store';
@Component({
  selector: 'app-course-content',
  imports: [
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatExpansionModule,
    MatListModule,
    MatIcon,
    MatDivider,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.scss',
})
export class CourseContentComponent {
  isOpened = signal<boolean>(true);
  defaultVideo = "./course-preview.mp4";
  courseId = input.required<string>();
  video = viewChild<ElementRef<HTMLVideoElement>>('videoPlayer');
  store = inject(CourseStore);
  videoUrl = signal<string>(this.defaultVideo);
  constructor() {
    effect(() => {
      this.store.loadSelectedCourse(this.courseId());
    });
  }

  openLectureVideo(videoUrl: string) {
    this.videoUrl.set(videoUrl);
    this.video()?.nativeElement.load();
    console.log(videoUrl);
    console.log(this.videoUrl())
  }
}
