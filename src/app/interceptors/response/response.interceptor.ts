import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

// Mis clases.
import { Token } from '../../interfaces/token';
import { SessionService } from '../../services/session/session.service';

export const responseInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let newRequest: HttpRequest<unknown> = request;

  // Verificamos si el token está disponible
  if (inject(SessionService).getTokenVerification()) {
    const cookie: string | null = inject(SessionService).getTokenCookie();
    const object: Token | null = inject(SessionService).getTokenObject(cookie);

    // Si tenemos el objeto token, lo agregamos al encabezado Authorization
    if (object) {
       console.log('Token enviado en la cabecera Authorization:', object.token);
      newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${object.token}`
        }
      });
    }
  }
  
  return next(newRequest);
};
