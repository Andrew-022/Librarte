import { TestBed } from '@angular/core/testing';

import { UserJsonService } from './user-json.service';

describe('DatabaseJSONService', () => {
  let service: UserJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
