import { CanActivateFn } from '@angular/router';

export const roleViewGuard: CanActivateFn = (route, state) => {
  return true;
};
