import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    MaterialModule,
    DecimalPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  totalStudents = 2500;

  totalRevenue = 18500;

  publishedCourses = 12;

  draftCourses = 3;

  averageRating = 4.8;
}
