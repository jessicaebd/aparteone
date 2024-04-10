import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceUpdateCategoryComponent } from './maintenance-update-category.component';

describe('MaintenanceUpdateCategoryComponent', () => {
  let component: MaintenanceUpdateCategoryComponent;
  let fixture: ComponentFixture<MaintenanceUpdateCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceUpdateCategoryComponent]
    });
    fixture = TestBed.createComponent(MaintenanceUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
