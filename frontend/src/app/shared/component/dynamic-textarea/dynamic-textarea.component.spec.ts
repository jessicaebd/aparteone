import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTextareaComponent } from './dynamic-textarea.component';

describe('DynamicTextareaComponent', () => {
  let component: DynamicTextareaComponent;
  let fixture: ComponentFixture<DynamicTextareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicTextareaComponent]
    });
    fixture = TestBed.createComponent(DynamicTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
