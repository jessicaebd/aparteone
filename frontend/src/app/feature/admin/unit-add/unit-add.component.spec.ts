import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitAddComponent } from './unit-add.component';

describe('UnitAddComponent', () => {
  let component: UnitAddComponent;
  let fixture: ComponentFixture<UnitAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitAddComponent]
    });
    fixture = TestBed.createComponent(UnitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
