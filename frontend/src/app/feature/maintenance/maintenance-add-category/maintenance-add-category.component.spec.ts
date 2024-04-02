import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceAddCategoryComponent } from './maintenance-add-category.component';

describe('MaintenanceAddCategoryComponent', () => {
  let component: MaintenanceAddCategoryComponent;
  let fixture: ComponentFixture<MaintenanceAddCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceAddCategoryComponent]
    });
    fixture = TestBed.createComponent(MaintenanceAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
