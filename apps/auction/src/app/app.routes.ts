import { Route } from '@angular/router';
import { AUTH_ROUTES } from './auth.routes.config';
import { LOT_ROUTES } from './lot/lot.routes.config';

export const appRoutes: Route[] = [
  {
    path: AUTH_ROUTES.SIGNUP.PATH,
    loadComponent: () =>
      import('./user-entry/signup-page/signup-page.component').then(
        (m) => m.SignupPageComponent,
      ),
  },
  {
    path: AUTH_ROUTES.LOGIN.PATH,
    loadComponent: () =>
      import('./user-entry/login-page/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: LOT_ROUTES.LOT.PATH,
    loadChildren: () => import('./lot/lot.routes').then((r) => r.lotRoutes),
  },
];
