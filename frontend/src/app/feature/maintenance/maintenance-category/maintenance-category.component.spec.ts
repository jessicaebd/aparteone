import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceCategoryComponent } from './maintenance-category.component';

describe('MaintenanceCategoryComponent', () => {
  let component: MaintenanceCategoryComponent;
  let fixture: ComponentFixture<MaintenanceCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceCategoryComponent]
    });
    fixture = TestBed.createComponent(MaintenanceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
