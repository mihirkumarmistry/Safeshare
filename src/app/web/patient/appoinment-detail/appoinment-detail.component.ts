import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { ApiStatus, KeyVal } from '../../../model/api.model';

@Component({
  selector: 'app-appoinment-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appoinment-detail.component.html',
  styleUrl: './appoinment-detail.component.scss'
})
export class AppoinmentDetailComponent {
  protected appointmentId: number;
  protected patientList: KeyVal[] = [];
  protected doctorList: KeyVal[] = [];
  protected appointmentForm: FormGroup;

  constructor(
    private router: Router, 
    protected fb: FormBuilder,
    protected apiService: ApiService,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.params.subscribe(d => {
      this.appointmentId = +d['id'];
    })
  }

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      id: [0],
      patientId: [0],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],

      appointmentType: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      appointmentTime: ['', [Validators.required]],
      reason: ['', [Validators.required]],

      doctorId: [0, [Validators.required]]
    });

    this.getPatientList();
    this.getDoctorList();

    if (this.appointmentId > 0) {
      this.getAppointmentById();
    }
  }

  private getPatientList(): void {
    this.apiService.getPatientList().subscribe((resp) => {
      if (resp.status == ApiStatus.Success && resp.data.length) {
        this.patientList = resp.data;
      }
    })
  }

  private getDoctorList(): void {
    this.apiService.getDoctorList().subscribe((resp) => {
      if (resp.status == ApiStatus.Success && resp.data.length) {
        this.doctorList = resp.data;
      }
    })
  }

  protected getPatientInfo(event: any): void {
    const data = this.appointmentForm.value;
    if(data.patientId && data.patientId > 0){
      this.apiService.getPatientById(data.patientId).subscribe((resp) => {
        if(resp.status == ApiStatus.Success && resp.data.length)
        {
          debugger
          const patient = resp.data[0];
          this.appointmentForm.controls["firstName"].setValue(patient.firstName);
          this.appointmentForm.controls["lastName"].setValue(patient.lastName);
          this.appointmentForm.controls["dateOfBirth"].setValue(new Date(patient.dateOfBirth));
          this.appointmentForm.controls["gender"].setValue(patient.gender);
          this.appointmentForm.controls["contact"].setValue(patient.contact);
          this.appointmentForm.controls["addressLine1"].setValue(patient.addressLine1);
          this.appointmentForm.controls["addressLine2"].setValue(patient.addressLine2);
          this.appointmentForm.controls["city"].setValue(patient.city);
          this.appointmentForm.controls["state"].setValue(patient.state);
          this.appointmentForm.controls["country"].setValue(patient.country);
          this.appointmentForm.controls["zipCode"].setValue(patient.zipCode);
        }
       })
    }
  }

  private getAppointmentById(): void {
    this.apiService.getAppointmentById(this.appointmentId).subscribe((resp) => {
      if (resp.status == ApiStatus.Success && resp.data.length) {
        this.appointmentForm.patchValue(resp.data[0]);
      }
    })
  }

  // appoinment form
  protected onSubmit(): void {
    if(this.appointmentForm.valid) {
      this.apiService.postAppointment(this.appointmentForm.value).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          this.router.navigate(['appointment']);
          // Show Success toast
        } else {
          // Show Error toast
        }
      })
    }
  }

  protected onCancel(): void {
    this.router.navigate(['/appointment']);
  }
}
