import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentUpdateCategoryComponent } from './payment-update-category.component';

describe('PaymentUpdateCategoryComponent', () => {
  let component: PaymentUpdateCategoryComponent;
  let fixture: ComponentFixture<PaymentUpdateCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentUpdateCategoryComponent]
    });
    fixture = TestBed.createComponent(PaymentUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
