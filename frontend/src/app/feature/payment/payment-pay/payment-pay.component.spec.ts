import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPayComponent } from './payment-pay.component';

describe('PaymentPayComponent', () => {
  let component: PaymentPayComponent;
  let fixture: ComponentFixture<PaymentPayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentPayComponent]
    });
    fixture = TestBed.createComponent(PaymentPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
