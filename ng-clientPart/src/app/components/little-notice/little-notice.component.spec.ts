import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LittleNoticeComponent } from './little-notice.component';

describe('LittleNoticeComponent', () => {
  let component: LittleNoticeComponent;
  let fixture: ComponentFixture<LittleNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LittleNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LittleNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
