import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLatestComponent } from './transaction-latest.component';

describe('TransactionLatestComponent', () => {
  let component: TransactionLatestComponent;
  let fixture: ComponentFixture<TransactionLatestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionLatestComponent]
    });
    fixture = TestBed.createComponent(TransactionLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
