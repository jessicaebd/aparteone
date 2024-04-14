import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxUpdateCategoryComponent } from './mailbox-update-category.component';

describe('MailboxUpdateCategoryComponent', () => {
  let component: MailboxUpdateCategoryComponent;
  let fixture: ComponentFixture<MailboxUpdateCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailboxUpdateCategoryComponent]
    });
    fixture = TestBed.createComponent(MailboxUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
