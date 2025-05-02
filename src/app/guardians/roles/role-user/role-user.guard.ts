import { CanActivateFn } from '@angular/router';

export const roleUserGuard: CanActivateFn = (route, state) => {
  return true;
};
