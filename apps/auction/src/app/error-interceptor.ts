import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorToast } from './api-error-toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorToast = inject(ErrorToast);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        errorToast.showApiError({
          message: error.message,
          title: 'title',
        });
      }
      return throwError(() => error);
    }),
  );
};
