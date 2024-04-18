import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityUpdateCategoryComponent } from './facility-update-category.component';

describe('FacilityUpdateCategoryComponent', () => {
  let component: FacilityUpdateCategoryComponent;
  let fixture: ComponentFixture<FacilityUpdateCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilityUpdateCategoryComponent]
    });
    fixture = TestBed.createComponent(FacilityUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
