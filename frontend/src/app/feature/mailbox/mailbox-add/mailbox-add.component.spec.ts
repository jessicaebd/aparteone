import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxAddComponent } from './mailbox-add.component';

describe('MailboxAddComponent', () => {
  let component: MailboxAddComponent;
  let fixture: ComponentFixture<MailboxAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailboxAddComponent]
    });
    fixture = TestBed.createComponent(MailboxAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
