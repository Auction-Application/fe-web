import { Route } from '@angular/router';
import { LOT_ROUTES } from './lot.routes.config';

export const lotRoutes: Route[] = [
  {
    path: LOT_ROUTES.CREATE.PATH,
    loadComponent: () =>
      import('./configure-lot/configure-lot.component').then(
        (c) => c.ConfigureLotComponent,
      ),
  },
];
