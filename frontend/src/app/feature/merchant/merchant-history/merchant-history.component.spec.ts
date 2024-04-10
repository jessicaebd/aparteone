import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantHistoryComponent } from './merchant-history.component';

describe('MerchantHistoryComponent', () => {
  let component: MerchantHistoryComponent;
  let fixture: ComponentFixture<MerchantHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantHistoryComponent]
    });
    fixture = TestBed.createComponent(MerchantHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
