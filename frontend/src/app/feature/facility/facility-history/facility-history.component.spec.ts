import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityHistoryComponent } from './facility-history.component';

describe('FacilityHistoryComponent', () => {
  let component: FacilityHistoryComponent;
  let fixture: ComponentFixture<FacilityHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilityHistoryComponent]
    });
    fixture = TestBed.createComponent(FacilityHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
