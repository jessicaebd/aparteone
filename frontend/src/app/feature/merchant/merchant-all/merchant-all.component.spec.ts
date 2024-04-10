import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAllComponent } from './merchant-all.component';

describe('MerchantAllComponent', () => {
  let component: MerchantAllComponent;
  let fixture: ComponentFixture<MerchantAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantAllComponent]
    });
    fixture = TestBed.createComponent(MerchantAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
