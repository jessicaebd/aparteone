import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityUpcomingComponent } from './facility-upcoming.component';

describe('FacilityUpcomingComponent', () => {
  let component: FacilityUpcomingComponent;
  let fixture: ComponentFixture<FacilityUpcomingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilityUpcomingComponent]
    });
    fixture = TestBed.createComponent(FacilityUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
