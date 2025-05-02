import { CanActivateFn } from '@angular/router';

export const roleAdministratorGuard: CanActivateFn = (route, state) => {
  return true;
};
