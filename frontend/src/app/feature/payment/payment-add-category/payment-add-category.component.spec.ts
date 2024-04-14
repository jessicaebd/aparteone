import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAddCategoryComponent } from './payment-add-category.component';

describe('PaymentAddCategoryComponent', () => {
  let component: PaymentAddCategoryComponent;
  let fixture: ComponentFixture<PaymentAddCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentAddCategoryComponent]
    });
    fixture = TestBed.createComponent(PaymentAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
