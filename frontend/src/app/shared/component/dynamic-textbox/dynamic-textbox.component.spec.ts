import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTextboxComponent } from './dynamic-textbox.component';

describe('DynamicTextboxComponent', () => {
  let component: DynamicTextboxComponent;
  let fixture: ComponentFixture<DynamicTextboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicTextboxComponent]
    });
    fixture = TestBed.createComponent(DynamicTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
