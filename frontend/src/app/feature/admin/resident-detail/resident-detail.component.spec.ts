import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentDetailComponent } from './resident-detail.component';

describe('ResidentDetailComponent', () => {
  let component: ResidentDetailComponent;
  let fixture: ComponentFixture<ResidentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResidentDetailComponent]
    });
    fixture = TestBed.createComponent(ResidentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
