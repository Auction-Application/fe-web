import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { ErrorToast } from './api-error-toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorToast = inject(ErrorToast);

  return next(req).pipe(
    tap({
      error: (error) => {
        if (error.status !== 401) {
          errorToast.showApiError({
            message: error.message,
            title: 'title',
          });
        }
      },
    }),
  );
};
