import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Environment } from './environment';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const environment = inject(Environment);
  const baseUrl = environment.getBaseUrl();

  req = req.clone({
    url: `${baseUrl}/${req.url}`,
  });
  return next(req);
};
