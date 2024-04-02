import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityAddCategoryComponent } from './facility-add-category.component';

describe('FacilityAddCategoryComponent', () => {
  let component: FacilityAddCategoryComponent;
  let fixture: ComponentFixture<FacilityAddCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilityAddCategoryComponent]
    });
    fixture = TestBed.createComponent(FacilityAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
