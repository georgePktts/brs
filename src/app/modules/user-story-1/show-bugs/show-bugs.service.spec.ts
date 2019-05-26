import { TestBed } from '@angular/core/testing';

import { ShowBugsService } from './show-bugs.service';

describe('ShowBugsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowBugsService = TestBed.get(ShowBugsService);
    expect(service).toBeTruthy();
  });
});
