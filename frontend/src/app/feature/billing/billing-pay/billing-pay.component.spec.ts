import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPayComponent } from './billing-pay.component';

describe('BillingPayComponent', () => {
  let component: BillingPayComponent;
  let fixture: ComponentFixture<BillingPayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingPayComponent]
    });
    fixture = TestBed.createComponent(BillingPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
