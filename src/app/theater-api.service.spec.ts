import { TestBed } from '@angular/core/testing';

import { TheaterApiService } from './theater-api.service';

describe('TheaterApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheaterApiService = TestBed.get(TheaterApiService);
    expect(service).toBeTruthy();
  });
});
