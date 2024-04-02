import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceRequestListComponent } from './maintenance-request-list.component';

describe('MaintenanceRequestListComponent', () => {
  let component: MaintenanceRequestListComponent;
  let fixture: ComponentFixture<MaintenanceRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceRequestListComponent]
    });
    fixture = TestBed.createComponent(MaintenanceRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
