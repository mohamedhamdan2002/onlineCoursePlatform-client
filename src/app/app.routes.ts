import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'course/:courseId/content',
    loadComponent: () => import('./pages/view-course-details/course-content/course-content.component').then(c => c.CourseContentComponent)
  },
  {
    path:'',
    component: MainLayoutComponent,
    children: [
      {
        path: 'courses',
        loadComponent: () => import('./pages/course-grid/course-grid.component').then(c => c.CourseGridComponent)
      },
      {
        path: 'course/:courseId',
        loadComponent: () => import('./pages/view-course-details/view-course-details.component').then(c => c.ViewCourseDetailsComponent)
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./pages/wishlist/wishlist.component').then(c => c.WishlistComponent)
      },
      {
        path: 'checkout/:courseId',
        loadComponent: () => import('./pages/checkout/checkout.component').then(c => c.CheckoutComponent)
      },
      {
        path: 'order-success',
        loadComponent: () => import('./pages/checkout/order-success/order-success.component').then(c => c.OrderSuccessComponent)
      },
      {
        path: 'student-dashboard',
        loadComponent: () => import('./pages/student-dashboard/student-dashboard.component').then(c => c.StudentDashboardComponent)
      }
    ]
  }
];
