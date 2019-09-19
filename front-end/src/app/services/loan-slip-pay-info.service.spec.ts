import { TestBed } from '@angular/core/testing';

import { LoanSlipPayInfoService } from './loan-slip-pay-info.service';

describe('LoanSlipPayInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanSlipPayInfoService = TestBed.get(LoanSlipPayInfoService);
    expect(service).toBeTruthy();
  });
});
