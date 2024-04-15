import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxAllComponent } from './mailbox-all.component';

describe('MailboxAllComponent', () => {
  let component: MailboxAllComponent;
  let fixture: ComponentFixture<MailboxAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailboxAllComponent]
    });
    fixture = TestBed.createComponent(MailboxAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
