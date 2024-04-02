import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityAllRequestComponent } from './facility-all-request.component';

describe('FacilityAllRequestComponent', () => {
  let component: FacilityAllRequestComponent;
  let fixture: ComponentFixture<FacilityAllRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilityAllRequestComponent]
    });
    fixture = TestBed.createComponent(FacilityAllRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
