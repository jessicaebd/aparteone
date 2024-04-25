import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddCategoryComponent } from './billing-add-category.component';

describe('BillingAddCategoryComponent', () => {
  let component: BillingAddCategoryComponent;
  let fixture: ComponentFixture<BillingAddCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingAddCategoryComponent]
    });
    fixture = TestBed.createComponent(BillingAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
