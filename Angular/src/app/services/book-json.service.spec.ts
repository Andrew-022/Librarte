import { TestBed } from '@angular/core/testing';

import { BookJsonService } from './book-json.service';

describe('BookJsonService', () => {
  let service: BookJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
