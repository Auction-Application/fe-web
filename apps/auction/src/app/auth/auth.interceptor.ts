import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthState } from './auth.state';

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthState);
  const token = authService.getAccessToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
