import { TestBed } from '@angular/core/testing';

import { DatabaseJSONService } from './database-json.service';

describe('DatabaseJSONService', () => {
  let service: DatabaseJSONService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseJSONService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
