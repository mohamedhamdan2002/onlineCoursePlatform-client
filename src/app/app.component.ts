import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { CourseStore } from './core/stores/course.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'online-course-platform';
  store = inject(CourseStore);
  ngOnInit(): void {
    this.store.loadWishlistFromStorage();
  }
}
