import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { ApiStatus } from '../../../model/api.model';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.scss'
})
export class PatientDetailComponent implements OnInit {
  protected patientId: number;
  protected patientForm: FormGroup;

  constructor(
    private router: Router, 
    protected fb: FormBuilder,
    protected apiService: ApiService,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.params.subscribe(d => {
      this.patientId = +d['id'];
    })
  }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      id: [0],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      imageUrl: [''],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      emergencyContact: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required]],
      relationship: ['', [Validators.required]],

      insuranceProviderName: [''],
      policyNumber: [''],
      policyholderName: [''],
      insuranceContact: ['']
    });

    if (this.patientId > 0) {
      this.getPatientById();
    }
  }

  private getPatientById(): void {
    this.apiService.getPatientById(this.patientId).subscribe((resp) => {
      if (resp.status == ApiStatus.Success && resp.data.length) {
        this.patientForm.patchValue(resp.data[0]);
      }
    })
  }

  // patient form
  protected onSubmit(): void {
    if(this.patientForm.valid) {
      this.apiService.postPatient(this.patientForm.value).subscribe((resp) => {
        if(resp.status == ApiStatus.Success)
        {
          this.router.navigate(['patient']);
          // Show success toast
        }
        else {
          // Show error toast
        }
      });
    }
  }

  protected onCancel(): void {
    this.router.navigate(['/patient']);
  }
}
