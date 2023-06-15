import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutnInterceptor } from './autn.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AutnInterceptor, multi: true },
];
