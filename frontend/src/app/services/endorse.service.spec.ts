import { TestBed } from '@angular/core/testing';

import { EndorseService } from './endorse.service';

describe('EndorseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndorseService = TestBed.get(EndorseService);
    expect(service).toBeTruthy();
  });
});
