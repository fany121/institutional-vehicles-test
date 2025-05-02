import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleAdministratorGuard } from './role-administrator.guard';

describe('roleAdministratorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleAdministratorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
