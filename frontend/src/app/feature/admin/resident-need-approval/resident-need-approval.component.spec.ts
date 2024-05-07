import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentNeedApprovalComponent } from './resident-need-approval.component';

describe('ResidentNeedApprovalComponent', () => {
  let component: ResidentNeedApprovalComponent;
  let fixture: ComponentFixture<ResidentNeedApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResidentNeedApprovalComponent]
    });
    fixture = TestBed.createComponent(ResidentNeedApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
