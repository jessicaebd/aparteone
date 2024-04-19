import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAllComponent } from './payment-all.component';

describe('PaymentAllComponent', () => {
  let component: PaymentAllComponent;
  let fixture: ComponentFixture<PaymentAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentAllComponent]
    });
    fixture = TestBed.createComponent(PaymentAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
