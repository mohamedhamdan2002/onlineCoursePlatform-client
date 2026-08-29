import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { InstructorLayoutComponent } from './layout/instructor/instructor-layout/instructor-layout.component';

export const routes: Routes = [
  {
    path: 'course/:courseId/content',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/view-course-details/course-content/course-content.component').then(c => c.CourseContentComponent)
  },
  {
    path: 'course-player',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/course-player/course-player.component').then(c => c.CoursePlayerComponent)
  },
  {
    path:'instructor',
    component: InstructorLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/instructor/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/instructor/settings/settings.component').then(c => c.SettingsComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./pages/instructor/analytics/analytics.component').then(c => c.AnalyticsComponent)
      },
      {
        path: 'create-course',
        loadComponent: () => import('./pages/instructor/create-course/course-form.component').then(c => c.CourseFormComponent)
      },
      {
        path: 'courses',
        loadComponent: () => import('./pages/instructor/courses/courses.component').then(c => c.CoursesComponent)
      },
      {
        path: 'unauthorized',
        loadComponent: () => import('./pages/errors/unauthorized/unauthorized.component').then(c => c.UnauthorizedComponent)
      },
      {
        path: 'server-error',
        loadComponent: () => import('./pages/errors/server-error/server-error.component').then(c => c.ServerErrorComponent)
      },
      {
        path: 'maintenance',
        loadComponent: () => import('./pages/errors/maintenance/maintenance.component').then(c => c.MaintenanceComponent)
      },
      {
        path: '**',
        loadComponent: () => import('./pages/errors/not-found/not-found.component').then(c => c.NotFoundComponent)
      }
    ]
  },
  {
    path:'',
    component: MainLayoutComponent,
    children: [
       {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
      },
      {
        path: 'courses',
        loadComponent: () => import('./pages/course-grid/course-grid.component').then(c => c.CourseGridComponent)
      },
      {
        path: 'courses/:courseId',
        loadComponent: () => import('./pages/view-course-details/view-course-details.component').then(c => c.ViewCourseDetailsComponent)
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./pages/wishlist/wishlist.component').then(c => c.WishlistComponent)
      },
      {
        path: 'checkout/:courseId',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/checkout/checkout.component').then(c => c.CheckoutComponent)
      },
      {
        path: 'order-success',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/checkout/order-success/order-success.component').then(c => c.OrderSuccessComponent)
      },
      {
        path: 'student-dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/student-dashboard/student-dashboard.component').then(c => c.StudentDashboardComponent)
      },
      {
        path: 'unauthorized',
        loadComponent: () => import('./pages/errors/unauthorized/unauthorized.component').then(c => c.UnauthorizedComponent)
      },
      {
        path: 'server-error',
        loadComponent: () => import('./pages/errors/server-error/server-error.component').then(c => c.ServerErrorComponent)
      },
      {
        path: 'maintenance',
        loadComponent: () => import('./pages/errors/maintenance/maintenance.component').then(c => c.MaintenanceComponent)
      },
      {
        path: '**',
        loadComponent: () => import('./pages/errors/not-found/not-found.component').then(c => c.NotFoundComponent)
      }
    ]
  }

];
