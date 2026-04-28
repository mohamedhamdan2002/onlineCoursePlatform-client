import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { MatTab, MatTabGroup } from '@angular/material/tabs'
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { CourseCurriculumComponent } from './course-curriculum/course-curriculum.component';
import { CourseReviewsComponent } from './course-reviews/course-reviews.component';
import { Router, RouterLink } from "@angular/router";
import { CourseStore } from '../../core/stores/course.store';
import { AuthStore } from '../../core/stores/auth.store';
import { Dialog } from '@angular/cdk/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-view-course-details',
  imports: [
    MatIcon,
    MatDivider,
    MatButton,
    MatTab,
    MatTabGroup,
    CourseOverviewComponent,
    CourseCurriculumComponent,
    CourseReviewsComponent,
    RouterLink
],
  templateUrl: './view-course-details.component.html',
  styleUrl: './view-course-details.component.scss',
})
export class ViewCourseDetailsComponent implements OnInit {
  courseId = input.required<string>();
  store = inject(CourseStore);
  isInWishlist = signal<boolean>(false);
  router = inject(Router);
  authStore = inject(AuthStore);
  dialog = inject(MatDialog);
  constructor() {
    effect(() => {
      console.log("effect method runs..");
      this.store.loadSelectedCourse(this.courseId());
      this.isInWishlist.set(this.store.wishlistCourses().has(this.courseId()));
    });

  }
  ngOnInit(): void {
    // console.log("ngOnInit: ");
    // console.log(this.courseId());
    // this.store.setCourseId(this.courseId);
    // this.store.loadSelectedCourse(this.courseId());
  }

  addOrRemoveFromWishlist() {
    if(this.isInWishlist()){
      this.store.removeFromWishlist(this.store.selectedCourse()!);
    }else {
      this.store.addToWishlist(this.store.selectedCourse()!);
    }
  }
  onEnrollClick() {
    if (!this.authStore.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(() => {
        if (this.authStore.isAuthenticated()) {
          this.router.navigate(['/checkout', this.courseId()]);
        }
      });
      return;
    }
    this.router.navigate(['/checkout', this.courseId()]);
  }
}
