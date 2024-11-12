import { TestBed } from '@angular/core/testing';

import { MusictopartitureAuxService } from './musictopartiture-aux.service';

describe('MusictopartitureAuxService', () => {
  let service: MusictopartitureAuxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusictopartitureAuxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
