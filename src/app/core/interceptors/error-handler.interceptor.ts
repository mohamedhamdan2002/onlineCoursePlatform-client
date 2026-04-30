import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToasterService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((response: HttpErrorResponse) => {
      console.log(response)
      switch(response.status) {
        case 401:
        case 403:
          router.navigate(['/unauthorized'])
          break;
        case 404:
          toaster.error('Resource not found');
          break;
        case 500:
          router.navigate(['server-error']);
          break;
        default:
          toaster.error(response.error.message || 'server not worked');
          break;
      }
      return throwError(() => response.error);
    })
  );
};
