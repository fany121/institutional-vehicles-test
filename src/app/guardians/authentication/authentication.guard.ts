import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

// Mis clases.

import { SessionService } from '../../services/session/session.service';


// Guard para las rutas principales.
export const authenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> => {
 // Verifica si el token es válido.
  if (inject(SessionService).getTokenVerification()) return true;
// Si no es válido, redirige a la página de inicio de sesión.
  inject(Router).navigate(['/login']);
  return false;
};
// Guard para las rutas hijas.

export const authenticationGuardChild: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> => {
  // Verifica si el token es válido.  
  if (inject(SessionService).getTokenVerification()) return true;

  inject(Router).navigate(['/login']);
  return false;
};
