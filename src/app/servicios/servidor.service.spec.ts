import { TestBed } from '@angular/core/testing';

import { ServidorService } from './servidor.service';

describe('ServidorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServidorService = TestBed.inject(ServidorService);
    expect(service).toBeTruthy();
  });
});
