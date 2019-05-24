import { TestBed } from '@angular/core/testing';

import { AuthorizationConfigInterceptor } from './authorization-config.interceptor';

describe('AuthorizationconfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationConfigInterceptor = TestBed.get(AuthorizationConfigInterceptor);
    expect(service).toBeTruthy();
  });
});
