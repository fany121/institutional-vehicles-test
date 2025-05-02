import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleViewGuard } from './role-view.guard';

describe('roleViewGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleViewGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
