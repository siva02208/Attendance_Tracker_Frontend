import { TestBed } from '@angular/core/testing';

import { StucourseService } from './stucourse.service';

describe('StucourseService', () => {
  let service: StucourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StucourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
