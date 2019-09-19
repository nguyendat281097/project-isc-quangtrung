import { TestBed } from '@angular/core/testing';

import { ReaderTypeService } from './reader-type.service';

describe('ReaderTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReaderTypeService = TestBed.get(ReaderTypeService);
    expect(service).toBeTruthy();
  });
});
