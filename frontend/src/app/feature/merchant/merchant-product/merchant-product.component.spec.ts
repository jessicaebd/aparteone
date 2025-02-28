import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantProductComponent } from './merchant-product.component';

describe('MerchantProductComponent', () => {
  let component: MerchantProductComponent;
  let fixture: ComponentFixture<MerchantProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantProductComponent]
    });
    fixture = TestBed.createComponent(MerchantProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
