import { Component, } from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import { MaterialModule } from '../../../shared/material.module';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [
    MatTableModule,
    MaterialModule,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  displayedColumns = [
    'course',
    'students',
    'rating',
    'price',
    'actions'
  ];
  courses = [
    {
      id: '1',
      title: 'Angular Masterclass',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      studentsCount: 1520,
      rating: 4.8,
      price: 99,
      category: {
        id: '1',
        name: 'Web Development'
      }
    },
    {
      id: '2',
      title: 'ASP.NET Core API',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      studentsCount: 980,
      rating: 4.7,
      price: 89,
      category: {
        id: '2',
        name: 'Backend'
      }
    }
  ];

}

