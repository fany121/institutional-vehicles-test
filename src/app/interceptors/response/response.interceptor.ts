import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';


// Mis clases.

import { Token } from '../../interfaces/token';

import { SessionService } from '../../services/session/session.service';

export const responseInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let newRequest: HttpRequest<unknown> = request;

  if (inject(SessionService).getTokenVerification()) {
    const cookie: string | null = inject(SessionService).getTokenCookie();
    const object: Token | null = inject(SessionService).getTokenObject(cookie);
    newRequest = request.clone({headers: request.headers.set('Authorization', `Bearer ${object!.token}`)});
    return next(newRequest);
  } else {
    return next(request);
  }
};
