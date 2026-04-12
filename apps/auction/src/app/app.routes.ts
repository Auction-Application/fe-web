import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./user-entry/signup-page/signup-page').then((m) => m.SignupPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./user-entry/login-page/login-page').then((m) => m.LoginPage),
  },
];
