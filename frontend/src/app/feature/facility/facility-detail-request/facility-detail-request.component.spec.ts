import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDetailRequestComponent } from './facility-detail-request.component';

describe('FacilityDetailRequestComponent', () => {
  let component: FacilityDetailRequestComponent;
  let fixture: ComponentFixture<FacilityDetailRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilityDetailRequestComponent]
    });
    fixture = TestBed.createComponent(FacilityDetailRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
