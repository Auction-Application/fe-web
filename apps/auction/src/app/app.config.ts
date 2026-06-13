import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTaiga } from '@taiga-ui/core';
import { appRoutes } from './app.routes';
import { errorInterceptor } from './error-interceptor';
import { apiUrlInterceptor } from './url.iterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideTaiga(),
    provideHttpClient(withInterceptors([apiUrlInterceptor, errorInterceptor])),
  ],
};
