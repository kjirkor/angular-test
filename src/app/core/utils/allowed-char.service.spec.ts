import { TestBed } from '@angular/core/testing';

import { AllowedCharService } from './allowed-char.service';

describe('AllowedCharService', () => {
  let service: AllowedCharService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllowedCharService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
