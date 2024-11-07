import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline } from '@ant-design/icons-angular/icons';
import { SharedModule } from '../../../theme/shared/shared.module';

@Component({
  selector: 'app-medical-history-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './medical-history-detail.component.html',
  styleUrl: './medical-history-detail.component.scss'
})
export class MedicalHistoryDetailComponent {
  protected medicalHistoryId: number;
  protected medicalHistoryForm: FormGroup;

  constructor(
    private router: Router,
    protected fb: FormBuilder,
    private iconService: IconService,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.params.subscribe(d => {
      this.medicalHistoryId = +d['id'];
    });

    this.iconService.addIcon(...[
      DeleteOutline,
    ]);
  }

  ngOnInit(): void {
    this.medicalHistoryForm = this.fb.group({
      id: [null],

      // Patient details
      patientId: [null, Validators.required],
      appoinmentId: [null, Validators.required],

      allergies: this.fb.array([this.createAllergiesGroup()]),
      previousMedicalConditions: this.fb.array([this.createPreviousMedicalConditionGroup()]),
      medications: this.fb.array([this.createMedicationGroup()]),
      surgicalHistory: this.fb.array([this.createSurgicalHistoryGroup()]),
      diagnosticTest: this.fb.array([this.createDiagnosticTestGroup()])
    });

    if (this.medicalHistoryId > 0) {
      this.temp();
    }
  }

  // Create a FormGroup for allergies
  createAllergiesGroup(): FormGroup {
    return this.fb.group({
      id: [null],
      patientId: [null],
      medicalHistoryId: [null],
      key: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  // Getter to access the breakdown array
  get allergies(): FormArray {
    return this.medicalHistoryForm.get('allergies') as FormArray;
  }

  // Add a new allergie
  addAllergie(): void {
    this.allergies.push(this.createAllergiesGroup());
  }

  // Remove an allergie
  removeAllergie(index: number): void {
    this.allergies.removeAt(index);
  }

  // Create a FormGroup for previous medical condition
  createPreviousMedicalConditionGroup(): FormGroup {
    return this.fb.group({
      id: [null],
      patientId: [null],
      medicalHistoryId: [null],
      key: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  // Getter to access the previous medical condition array
  get previousMedicalConditions(): FormArray {
    return this.medicalHistoryForm.get('previousMedicalConditions') as FormArray;
  }

  // Add a new previous medical condition
  addPreviousMedicalCondition(): void {
    this.previousMedicalConditions.push(this.createPreviousMedicalConditionGroup());
  }

  // Remove a previous medical condition
  removePreviousMedicalCondition(index: number): void {
    this.previousMedicalConditions.removeAt(index);
  }

  // Create a FormGroup for medication
  createMedicationGroup(): FormGroup {
    return this.fb.group({
      id: [null],
      patientId: [null],
      appoinmentId: [null],
      medicalHistoryId: [null],
      name: ['', Validators.required],
      dosage: ['', Validators.required],
      frequency: ['', Validators.required],
      isCurrent: [false],
    });
  }

  // Getter to access the medication
  get medications(): FormArray {
    return this.medicalHistoryForm.get('medications') as FormArray;
  }

  // Add a new medications
  addMedication(): void {
    this.medications.push(this.createMedicationGroup());
  }

  // Remove a medication
  removeMedication(index: number): void {
    this.medications.removeAt(index);
  }

  // Create a FormGroup for surgicalHistory
  createSurgicalHistoryGroup(): FormGroup {
    return this.fb.group({
      id: [null],
      patientId: [null],
      appoinmentId: [null],
      medicalHistoryId: [null],
      procedureName: ['', Validators.required],
      procedureDate: ['', Validators.required],
      doctorName: ['', Validators.required],
      hospitalName: ['', Validators.required],
    });
  }

  // Getter to access the surgicalHistory
  get surgicalHistory(): FormArray {
    return this.medicalHistoryForm.get('surgicalHistory') as FormArray;
  }

  // Add a new surgicalHistory
  addSurgicalHistory(): void {
    this.surgicalHistory.push(this.createSurgicalHistoryGroup());
  }

  // Remove a surgicalHistory
  removeSurgicalHistory(index: number): void {
    this.surgicalHistory.removeAt(index);
  }

  // Create a FormGroup for diagnosticTest
  createDiagnosticTestGroup(): FormGroup {
    return this.fb.group({
      id: [null],
      patientId: [null],
      appoinmentId: [null],
      medicalHistoryId: [null],
      labTestName: ['', Validators.required],
      labTestDate: ['', Validators.required],
      result: ['', Validators.required],
      image: ['', Validators.required],
      imageFindings: ['', Validators.required],
    });
  }

  // Getter to access the surgicalHistory
  get diagnosticTest(): FormArray {
    return this.medicalHistoryForm.get('diagnosticTest') as FormArray;
  }

  // Add a new surgicalHistory
  addDiagnosticTest(): void {
    this.diagnosticTest.push(this.createDiagnosticTestGroup());
  }

  // Remove a surgicalHistory
  removeDiagnosticTest(index: number): void {
    this.diagnosticTest.removeAt(index);
  }

  // medicalHistory form
  protected onSubmit(): void {
    console.log(this.medicalHistoryForm.value);
  }

  protected onCancel(): void {
    this.router.navigate(['/medical-history']);
  }

  // teamp function
  private temp(): void {
    const data = {
      id: 1,
      patientId: 101,
      appoinemntId: 1001,
      allergies: [
        {
          id: 1,
          patientId: 101,
          medicalHistoryId: 1,
          key: "Peanut",
          value: "Severe"
        },
        {
          id: 2,
          patientId: 101,
          medicalHistoryId: 1,
          key: "Penicillin",
          value: "Mild"
        }
      ],
      previousMedicalConditions: [
        {
          id: 3,
          patientId: 101,
          medicalHistoryId: 1,
          key: "Hypertension",
          value: "Controlled with medication"
        },
        {
          id: 4,
          patientId: 101,
          medicalHistoryId: 1,
          key: "Diabetes",
          value: "Type 2"
        }
      ],
      medications: [
        {
          id: 1,
          patientId: 101,
          appoinmentId: 1001,
          medicalHistoryId: 1,
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice a day",
          isCurrent: "Yes"
        }
      ],
      surgicalHistory: [
        {
          id: 1,
          patientId: 101,
          medicalHistoryId: 1,
          procedureName: "Appendectomy",
          procedureDate: "2020-08-15",
          doctorName: "Dr. Smith",
          hospitalName: "City Hospital"
        }
      ],
      diagnosticTest: [
        {
          id: 1,
          patientId: 101,
          medicalHistoryId: 1,
          labTestName: "Blood Test",
          labTestDate: "2023-05-20",
          result: "Normal",
          image: "blood_test_report.png",
          imageFindings: "All parameters within normal range"
        }
      ]
    };

    this.addAllergie();
    this.addPreviousMedicalCondition();

    this.medicalHistoryForm.patchValue(data);
  }
}
