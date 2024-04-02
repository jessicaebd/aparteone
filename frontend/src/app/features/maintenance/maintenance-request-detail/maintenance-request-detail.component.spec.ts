import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceRequestDetailComponent } from './maintenance-request-detail.component';

describe('MaintenanceRequestDetailComponent', () => {
  let component: MaintenanceRequestDetailComponent;
  let fixture: ComponentFixture<MaintenanceRequestDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceRequestDetailComponent]
    });
    fixture = TestBed.createComponent(MaintenanceRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
