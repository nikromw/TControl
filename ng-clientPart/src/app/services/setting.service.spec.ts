import { TestBed } from '@angular/core/testing';

import { NoteSettingServiceService } from './setting.service';

describe('NoteSettingServiceService', () => {
  let service: NoteSettingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteSettingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
