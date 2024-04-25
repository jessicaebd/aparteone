import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAllComponent } from './billing-all.component';

describe('BillingAllComponent', () => {
  let component: BillingAllComponent;
  let fixture: ComponentFixture<BillingAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingAllComponent]
    });
    fixture = TestBed.createComponent(BillingAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
