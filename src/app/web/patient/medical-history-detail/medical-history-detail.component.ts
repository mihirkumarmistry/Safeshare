import { Component, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, EyeOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiStatus, KeyVal } from '../../../model/api.model';
import { DiagnosticTest, MedicalKeyVal, Medications, SurgicalHistory } from '../../../model/medical-history.model';
import { ApiService } from '../../../service/api.service';
import { SharedModule } from '../../../theme/shared/shared.module';

@Component({
  selector: 'app-medical-history-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './medical-history-detail.component.html',
  styleUrl: './medical-history-detail.component.scss'
})
export class MedicalHistoryDetailComponent {
  private modalService = inject(NgbModal);

  protected medicalHistoryId: number;
  protected patientList: KeyVal[] = [];

  protected allergiesList: MedicalKeyVal[] = [];
  protected previousMedicalConditionsList: MedicalKeyVal[] = [];
  protected medicationsList: Medications[] = [];
  protected surgicalHistoryList: SurgicalHistory[] = [];
  protected diagnosticTestList: DiagnosticTest[] = [];

  protected medicalHistoryForm: FormGroup;
  protected allergieForm: FormGroup;
  protected previousMedicalConditionsForm: FormGroup;
  protected medicationsForm: FormGroup;
  protected surgicalHistoryForm: FormGroup;
  protected diagnosticTestForm: FormGroup;

  constructor(
    private router: Router,
    protected fb: FormBuilder,
    protected apiService: ApiService,
    private iconService: IconService,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.params.subscribe(d => {
      this.medicalHistoryId = +d['id'];
    });

    this.iconService.addIcon(...[
      EyeOutline,
      EditOutline,
      DeleteOutline,
      PlusOutline,
    ]);
  }

  ngOnInit(): void {
    this.medicalHistoryForm = this.fb.group({
      id: [0],
      patientId: [0, Validators.required],
      title: ['', Validators.required],
      detail: ['']
    });

    this.allergieForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      medicalHistoryId: [0]
    });

    this.previousMedicalConditionsForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      medicalHistoryId: [0]
    });

    this.medicationsForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      dosage: ['', Validators.required],
      frequency: ['', Validators.required],
      isCurrent: [true],
      medicalHistoryId: [0]
    });

    this.surgicalHistoryForm = this.fb.group({
      id: [0],
      proceduresName: ['', Validators.required],
      proceduresDate: ['', Validators.required],
      doctorName: ['', Validators.required],
      hospitalName: ['', Validators.required],
      medicalHistoryId: [0]
    });

    this.diagnosticTestForm = this.fb.group({
      id: [0],
      labTestName: ['', Validators.required],
      labTestDate: ['', Validators.required],
      result: ['', Validators.required],
      image: [''],
      imageFindings: ['', Validators.required],
      medicalHistoryId: [0]
    });

    this.getPatientList();

    if (this.medicalHistoryId > 0) {
      this.getMedicalHistory();
    }
  }

  private getPatientList(): void {
    this.apiService.getPatientList().subscribe((resp) => {
      if (resp.status == ApiStatus.Success && resp.data.length) {
        this.patientList = resp.data;
      }
    })
  }

  protected getMedicalHistory(): void {
    this.apiService.getMedicalhistoryById(this.medicalHistoryId).subscribe((resp) => {
      if (resp.status == ApiStatus.Success) {
        const data = resp.data[0];
        this.medicalHistoryForm.patchValue(data);
        this.allergiesList = data.allergies;
        this.previousMedicalConditionsList = data.previousMedicalConditions;
        this.medicationsList = data.medications;
        this.surgicalHistoryList = data.surgicalHistory;
        this.diagnosticTestList = data.diagnosticTest;
      }
    });
  }

  // medicalHistory form
  protected onSubmit(): void {
    if (this.medicalHistoryForm.valid) {
      this.apiService.postMedicalhistory(this.medicalHistoryForm.value).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          this.medicalHistoryId = resp.data[0].id;
        } else {
        }
      });
    }
  }

  protected onCancel(): void {
    this.router.navigate(['/medical-history']);
  }

  // Allergie
  getAllergies(): void {
    this.apiService.getAllergiesById(this.medicalHistoryId).subscribe((resp) => {
      if (resp.status == ApiStatus.Success) {
        this.allergiesList = resp.data;
      }
    });
  }
  saveAllergies(): void {
    if (this.allergieForm.valid) {
      this.apiService.postAllergies(this.allergieForm.value).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          this.allergieForm.reset();
          this.modalService.dismissAll();
          this.getAllergies();
        }
      });
    }
  }
  deleteAllergie(data: MedicalKeyVal): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.apiService.deleteAllergies(data).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          // Show success toast
          this.getAllergies();
        } else {
          // Show error toast
        }
      })
    }
  }
  openAllergie(content: TemplateRef<any>, data: MedicalKeyVal = null) {
    if (data == null) {
      this.allergieForm.reset();
      this.allergieForm.controls['id'].setValue(0);
      this.allergieForm.controls['medicalHistoryId'].setValue(this.medicalHistoryId);
    } else {
      this.allergieForm.patchValue(data);
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.allergieForm.reset();
      },
      (reason) => {
        this.allergieForm.reset();
      },
    );
  }

  // Previous Medical Conditions
  getPreviousMedicalCondition(): void {
    this.apiService.getPreviousMedicalConditionById(this.medicalHistoryId).subscribe((resp) => {
      if (resp.status == ApiStatus.Success) {
        this.previousMedicalConditionsList = resp.data;
      }
    });
  }
  savePreviousMedicalCondition(): void {
    if (this.previousMedicalConditionsForm.valid) {
      this.apiService.postPreviousMedicalCondition(this.previousMedicalConditionsForm.value).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          this.previousMedicalConditionsForm.reset();
          this.modalService.dismissAll();
          this.getPreviousMedicalCondition();
        }
      });
    }
  }
  deletePreviousMedicalCondition(data: MedicalKeyVal): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.apiService.deletePreviousMedicalCondition(data).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          // Show success toast
          this.getPreviousMedicalCondition();
        } else {
          // Show error toast
        }
      })
    }
  }
  openPreviousMedicalCondition(content: TemplateRef<any>, data: MedicalKeyVal = null) {
    if (data == null) {
      this.previousMedicalConditionsForm.reset();
      this.previousMedicalConditionsForm.controls['id'].setValue(0);
      this.previousMedicalConditionsForm.controls['medicalHistoryId'].setValue(this.medicalHistoryId);
    } else {
      this.previousMedicalConditionsForm.patchValue(data);
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.previousMedicalConditionsForm.reset();
      },
      (reason) => {
        this.previousMedicalConditionsForm.reset();
      }
    );
  }

  // Medication Details
  getMedication(): void {
    this.apiService.getMedicationById(this.medicalHistoryId).subscribe((resp) => {
      if (resp.status == ApiStatus.Success) {
        this.medicationsList = resp.data;
      }
    });
  }
  saveMedication(): void {
    if (this.medicationsForm.valid) {
      this.apiService.postMedication(this.medicationsForm.value).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          this.medicationsForm.reset();
          this.modalService.dismissAll();
          this.getMedication();
        }
      });
    }
  }
  deleteMedication(data: Medications): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.apiService.deleteMedication(data).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          // Show success toast
          this.getMedication();
        } else {
          // Show error toast
        }
      })
    }
  }
  openMedication(content: TemplateRef<any>, data: Medications = null) {
    if (data == null) {
      this.medicationsForm.reset();
      this.medicationsForm.controls['id'].setValue(0);
      this.medicationsForm.controls['medicalHistoryId'].setValue(this.medicalHistoryId);
    } else {
      this.medicationsForm.patchValue(data);
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.medicationsForm.reset();
      },
      (reason) => {
        this.medicationsForm.reset();
      }
    );
  }

  // Surgical History
  getSurgicalHistory(): void {
    this.apiService.getSurgicalHistoryById(this.medicalHistoryId).subscribe((resp) => {
      if (resp.status == ApiStatus.Success) {
        this.surgicalHistoryList = resp.data;
      }
    });
  }
  saveSurgicalHistory(): void {
    if (this.surgicalHistoryForm.valid) {
      this.apiService.postSurgicalHistory(this.surgicalHistoryForm.value).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          this.surgicalHistoryForm.reset();
          this.modalService.dismissAll();
          this.getSurgicalHistory();
        }
      });
    }
  }
  deleteSurgicalHistory(data: SurgicalHistory): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.apiService.deleteSurgicalHistory(data).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          // Show success toast
          this.getSurgicalHistory();
        } else {
          // Show error toast
        }
      })
    }
  }
  openSurgicalHistory(content: TemplateRef<any>, data: SurgicalHistory = null) {
    if (data == null) {
      this.surgicalHistoryForm.reset();
      this.surgicalHistoryForm.controls['id'].setValue(0);
      this.surgicalHistoryForm.controls['medicalHistoryId'].setValue(this.medicalHistoryId);
    } else {
      this.surgicalHistoryForm.patchValue(data);
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.surgicalHistoryForm.reset();
      },
      (reason) => {
        this.surgicalHistoryForm.reset();
      }
    );
  }

    // Diagnostic Test
    getDiagnosticTest(): void {
      this.apiService.getDiagnosticTestById(this.medicalHistoryId).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          this.diagnosticTestList = resp.data;
        }
      });
    }
    saveDiagnosticTest(): void {
      if (this.diagnosticTestForm.valid) {
        this.apiService.postDiagnosticTest(this.diagnosticTestForm.value).subscribe((resp) => {
          if (resp.status == ApiStatus.Success) {
            this.diagnosticTestForm.reset();
            this.modalService.dismissAll();
            this.getDiagnosticTest();
          }
        });
      }
    }
    deleteDiagnosticTest(data: DiagnosticTest): void {
      if (confirm("Are you sure you want to delete this record?")) {
        this.apiService.deleteDiagnosticTest(data).subscribe((resp) => {
          if (resp.status == ApiStatus.Success) {
            // Show success toast
            this.getDiagnosticTest();
          } else {
            // Show error toast
          }
        })
      }
    }
    openDiagnosticTest(content: TemplateRef<any>, data: DiagnosticTest = null) {
      if (data == null) {
        this.diagnosticTestForm.reset();
        this.diagnosticTestForm.controls['id'].setValue(0);
        this.diagnosticTestForm.controls['medicalHistoryId'].setValue(this.medicalHistoryId);
      } else {
        this.diagnosticTestForm.patchValue(data);
      }
  
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.diagnosticTestForm.reset();
        },
        (reason) => {
          this.diagnosticTestForm.reset();
        }
      );
    }
}
