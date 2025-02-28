import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementDetailComponent } from './announcement-detail.component';

describe('AnnouncementDetailComponent', () => {
  let component: AnnouncementDetailComponent;
  let fixture: ComponentFixture<AnnouncementDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnouncementDetailComponent]
    });
    fixture = TestBed.createComponent(AnnouncementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
