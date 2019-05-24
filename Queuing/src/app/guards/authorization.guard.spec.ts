import { TestBed } from '@angular/core/testing';

import { AuthorizationGuard } from './authorization.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

export function provideConfig() {}

describe('AuthorizationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthorizationGuard]
    });
  });
});
