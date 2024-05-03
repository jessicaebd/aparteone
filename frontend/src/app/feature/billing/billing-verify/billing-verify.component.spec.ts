import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingVerifyComponent } from './billing-verify.component';

describe('BillingVerifyComponent', () => {
  let component: BillingVerifyComponent;
  let fixture: ComponentFixture<BillingVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingVerifyComponent]
    });
    fixture = TestBed.createComponent(BillingVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
