import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.params.subscribe(d => {
      this.patientId = +d['id'];
    })
  }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      id: [null],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
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
      contactName: ['', [Validators.required]],
      relationship: ['', [Validators.required]],

      providerName: [''],
      policyNumber: [''],
      policyholderName: [''],
      insuranceContact: ['']
    });

    if (this.patientId > 0) {
      this.temp();
    }
  }

  // patient form
  protected onSubmit(): void {
    console.log(this.patientForm.value);
  }

  protected onCancel(): void {
    this.router.navigate(['/patient']);
  }

  // teamp function
  private temp(): void {
    const data = {
      id: 1,
      firstName: "John",
      middleName: "A",
      lastName: "Doe",
      dob: "1985-02-14",
      gender: "male",
      imageUrl: "https://example.com/images/john_doe.jpg",
      addressLine1: "123 Main St",
      addressLine2: "Apt 1A",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10001",
      contact: "+1234567890",
      emergencyContact: "+0987654321",
      contactName: "Jane Doe",
      relationship: "Spouse",
      providerName: "Blue Cross",
      policyNumber: "BC123456",
      policyholderName: "John Doe",
      insuranceContact: "+1234567891"
    };

    this.patientForm.patchValue(data);
  }
}
