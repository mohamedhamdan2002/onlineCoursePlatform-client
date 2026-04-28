import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToasterService);
  return next(req).pipe(
    catchError((response: HttpErrorResponse) => {
      toaster.error(response.error.message || 'server not worked');
      return throwError(() => response.error);
    })
  );
};
