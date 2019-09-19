import { TestBed } from '@angular/core/testing';

import { LoanSlipPayService } from './loan-slip-pay.service';

describe('LoanSlipPayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanSlipPayService = TestBed.get(LoanSlipPayService);
    expect(service).toBeTruthy();
  });
});
