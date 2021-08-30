import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserResolverService } from './user-resolver.service';

describe('UserResolverService', () => {
  let service: UserResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(UserResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
