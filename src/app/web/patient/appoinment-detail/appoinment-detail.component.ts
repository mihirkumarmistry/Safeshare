import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-appoinment-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appoinment-detail.component.html',
  styleUrl: './appoinment-detail.component.scss'
})
export class AppoinmentDetailComponent {
  protected appoinmentId: number;
  protected appoinmentForm: FormGroup;

  constructor(
    private router: Router, 
    protected fb: FormBuilder,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.params.subscribe(d => {
      this.appoinmentId = +d['id'];
    })
  }

  ngOnInit(): void {
    this.appoinmentForm = this.fb.group({
      id: [null],
      patientId: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],

      type: ['', [Validators.required]],
      appoinmentDate: ['', [Validators.required]],
      appoinmentTime: ['', [Validators.required]],
      reason: ['', [Validators.required]],

      doctorId: ['', [Validators.required]]
    });

    if (this.appoinmentId > 0) {
      this.temp();
    }
  }

  // appoinment form
  protected onSubmit(): void {
    console.log(this.appoinmentForm.value);
  }

  protected onCancel(): void {
    this.router.navigate(['/appointment']);
  }

  // teamp function
  private temp(): void {
    const data = {
      id: 1,
      patientId: 101,
      firstName: "John",
      lastName: "Doe",
      dob: "1985-02-14",
      gender: "male",
      contact: "+1234567890",
      addressLine1: "123 Main St",
      addressLine2: "Apt 1A",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10001",
      type: "New Consultation",
      appoinmentDate: "2024-11-15",
      appoinmentTime: "2024-11-15T10:30:00",
      reason: "General Checkup",
      doctorId: 201
  };

    this.appoinmentForm.patchValue(data);
  }
}
