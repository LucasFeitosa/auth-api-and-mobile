import { TestBed } from '@angular/core/testing';

import { InsideInfoService } from './inside-info.service';

describe('InsideInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsideInfoService = TestBed.get(InsideInfoService);
    expect(service).toBeTruthy();
  });
});
