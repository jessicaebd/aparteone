import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentNeedApprovalComponent } from './apartment-need-approval.component';

describe('ApartmentNeedApprovalComponent', () => {
  let component: ApartmentNeedApprovalComponent;
  let fixture: ComponentFixture<ApartmentNeedApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentNeedApprovalComponent]
    });
    fixture = TestBed.createComponent(ApartmentNeedApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
