import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';

// Librerías externas.

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

// Mis clases.

import { responseInterceptor } from './interceptors/response/response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([responseInterceptor])),
    { provide: JWT_OPTIONS, useValue: {} },
    JwtHelperService
  ]
};
