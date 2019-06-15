import { TestBed } from '@angular/core/testing';

import { ShowBugsService } from './show-bugs.service';
import { HttpClientModule } from '@angular/common/http';

describe('ShowBugsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ShowBugsService = TestBed.get(ShowBugsService);
    expect(service).toBeTruthy();
  });
});
