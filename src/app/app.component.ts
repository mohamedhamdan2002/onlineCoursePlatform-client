import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { CourseStore } from './core/stores/course.store';
import { SignalREnrollmentClient } from './core/realtime/signalr-enrollment-client';
import { EnrollmentStore } from './core/stores/enrollment.store';
import { AuthStore } from './core/stores/auth.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'online-course-platform';
  store = inject(CourseStore);
  enrollmentStore = inject(EnrollmentStore);
  signalREnrollmentClient = inject(SignalREnrollmentClient);
  constructor() {
    this.signalREnrollmentClient.onEnrollmentCreated((data) => {
      this.enrollmentStore.onNewEnrollmentCreated(data);
    });
  }
  ngOnInit(): void {
    this.store.loadWishlistFromStorage();
  }

}
