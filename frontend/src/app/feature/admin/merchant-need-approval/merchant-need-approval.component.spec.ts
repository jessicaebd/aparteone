import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantNeedApprovalComponent } from './merchant-need-approval.component';

describe('MerchantNeedApprovalComponent', () => {
  let component: MerchantNeedApprovalComponent;
  let fixture: ComponentFixture<MerchantNeedApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantNeedApprovalComponent]
    });
    fixture = TestBed.createComponent(MerchantNeedApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
