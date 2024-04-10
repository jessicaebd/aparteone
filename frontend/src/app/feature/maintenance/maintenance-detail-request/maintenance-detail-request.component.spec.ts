import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceDetailRequestComponent } from './maintenance-detail-request.component';

describe('MaintenanceDetailRequestComponent', () => {
  let component: MaintenanceDetailRequestComponent;
  let fixture: ComponentFixture<MaintenanceDetailRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceDetailRequestComponent]
    });
    fixture = TestBed.createComponent(MaintenanceDetailRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
