import { TestBed } from '@angular/core/testing';

import { BookTitleService } from './book-title.service';

describe('BookTitleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookTitleService = TestBed.get(BookTitleService);
    expect(service).toBeTruthy();
  });
});
