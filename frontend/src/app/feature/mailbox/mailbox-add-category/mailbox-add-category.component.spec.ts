import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxAddCategoryComponent } from './mailbox-add-category.component';

describe('MailboxAddCategoryComponent', () => {
  let component: MailboxAddCategoryComponent;
  let fixture: ComponentFixture<MailboxAddCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailboxAddCategoryComponent]
    });
    fixture = TestBed.createComponent(MailboxAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
