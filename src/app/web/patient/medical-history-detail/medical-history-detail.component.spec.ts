import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryDetailComponent } from './medical-history-detail.component';

describe('MedicalHistoryDetailComponent', () => {
  let component: MedicalHistoryDetailComponent;
  let fixture: ComponentFixture<MedicalHistoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalHistoryDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
