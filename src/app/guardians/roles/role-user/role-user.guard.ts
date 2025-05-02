import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

// Mis clases.

import { User } from '../../../interfaces/user';

import { SessionService } from '../../../services/session/session.service';

export const roleUserGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : MaybeAsync<GuardResult> => {
  const user: User | undefined = inject(SessionService).getCurrentUser();
  
  if (user) {
    if (user.id_role == 2) {
      return true;
    } else {
      inject(Router).navigate(['/panel']);

      return false;
    }
  } else {
    inject(Router).navigate(['/login']);

    return false;
  }
};
