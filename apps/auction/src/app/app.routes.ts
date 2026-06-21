import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'signup',
    loadComponent: () =>
      import('./user-entry/signup-page/signup-page.component').then(
        (m) => m.SignupPageComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./user-entry/login-page/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
];
