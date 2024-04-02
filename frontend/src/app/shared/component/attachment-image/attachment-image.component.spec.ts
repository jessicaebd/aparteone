import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentImageComponent } from './attachment-image.component';

describe('AttachmentImageComponent', () => {
  let component: AttachmentImageComponent;
  let fixture: ComponentFixture<AttachmentImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttachmentImageComponent]
    });
    fixture = TestBed.createComponent(AttachmentImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
