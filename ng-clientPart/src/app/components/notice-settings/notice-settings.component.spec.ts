import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeSettingsComponent } from './notice-settings.component';

describe('NoticeSettingsComponent', () => {
  let component: NoticeSettingsComponent;
  let fixture: ComponentFixture<NoticeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
