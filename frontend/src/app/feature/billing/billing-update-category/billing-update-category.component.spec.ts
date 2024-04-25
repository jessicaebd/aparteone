import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingUpdateCategoryComponent } from './billing-update-category.component';

describe('BillingUpdateCategoryComponent', () => {
  let component: BillingUpdateCategoryComponent;
  let fixture: ComponentFixture<BillingUpdateCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingUpdateCategoryComponent]
    });
    fixture = TestBed.createComponent(BillingUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
