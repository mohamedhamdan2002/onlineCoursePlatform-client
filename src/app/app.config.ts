import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthStore } from './core/stores/auth.store';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHotToastConfig({ style: { marginTop: '70px' }, stacking: 'depth', duration: 1000 }),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loadingInterceptor,
        errorHandlerInterceptor
      ])
    ),
    provideAppInitializer(() => {
      const authStore = inject(AuthStore);
      authStore.initAuth();
    })
  ]
};
