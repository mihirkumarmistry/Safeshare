import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentDetailComponent } from './appoinment-detail.component';

describe('AppoinmentDetailComponent', () => {
  let component: AppoinmentDetailComponent;
  let fixture: ComponentFixture<AppoinmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppoinmentDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoinmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
