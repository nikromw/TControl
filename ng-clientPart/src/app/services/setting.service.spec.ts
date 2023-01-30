import { TestBed } from '@angular/core/testing';

import { NoteSettingService } from './setting.service';

describe('NoteSettingService', () => {
  let service: NoteSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
