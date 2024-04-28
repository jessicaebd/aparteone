import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDetailComponent } from './apartment-detail.component';

describe('ApartmentDetailComponent', () => {
  let component: ApartmentDetailComponent;
  let fixture: ComponentFixture<ApartmentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentDetailComponent]
    });
    fixture = TestBed.createComponent(ApartmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
