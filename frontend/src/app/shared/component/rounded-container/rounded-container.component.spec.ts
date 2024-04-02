import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedContainerComponent } from './rounded-container.component';

describe('RoundedContainerComponent', () => {
  let component: RoundedContainerComponent;
  let fixture: ComponentFixture<RoundedContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoundedContainerComponent]
    });
    fixture = TestBed.createComponent(RoundedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
