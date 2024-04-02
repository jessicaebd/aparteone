import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceAllRequestComponent } from './maintenance-all-request.component';

describe('MaintenanceAllRequestComponent', () => {
  let component: MaintenanceAllRequestComponent;
  let fixture: ComponentFixture<MaintenanceAllRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceAllRequestComponent]
    });
    fixture = TestBed.createComponent(MaintenanceAllRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
