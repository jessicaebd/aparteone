import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddComponent } from './billing-add.component';

describe('BillingAddComponent', () => {
  let component: BillingAddComponent;
  let fixture: ComponentFixture<BillingAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingAddComponent]
    });
    fixture = TestBed.createComponent(BillingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
