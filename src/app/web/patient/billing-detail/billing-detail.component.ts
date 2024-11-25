import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline } from '@ant-design/icons-angular/icons';
import { SharedModule } from '../../../theme/shared/shared.module';
import { ApiService } from '../../../service/api.service';
import { ApiStatus, KeyVal } from '../../../model/api.model';

@Component({
  selector: 'app-billing-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './billing-detail.component.html',
  styleUrl: './billing-detail.component.scss'
})
export class BillingDetailComponent {
  protected billId: number;
  protected patientList: KeyVal[] = [];
  protected appointmentList: KeyVal[] = [];
  protected billingForm: FormGroup;

  constructor(
    private router: Router,
    protected fb: FormBuilder,
    protected apiService: ApiService,
    private iconService: IconService,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.params.subscribe(d => {
      this.billId = +d['id'];
    });

    this.iconService.addIcon(...[
      DeleteOutline,
    ]);
  }

  ngOnInit(): void {
    this.billingForm = this.fb.group({
      id: [0],

      // Patient details
      name: ['', Validators.required],
      patientId: [null, Validators.required],
      appoinmentId: [null],

      // Billing info
      billingDate: [null, Validators.required],
      billingDueDate: [null, Validators.required],
      breaskdowns: this.fb.array([this.createBreakdownGroup()]),
      totalAmount: [0, Validators.required],
      insuranceCoverageAmount: [0, Validators.required],
      insuranceNumber: [''],
      taxPercentage: [0, Validators.required],
      taxAmount: [0, Validators.required],
      discount: [0],
      finalBillAmount: [0, Validators.required],

      // Payment info
      paymentId: [''],
      paymentDate: [new Date()],
      paymentMode: [''],
      amountPaid: [0],
      transactionId: [''],
      balanceDue: [0],
      paymentStatus: ['Pending', Validators.required]
    });

    this.getPatientList(); 
    this.getAppointmentList(); 

    if (this.billId > 0) {
      this.getBillById();
    }
  }

  private getPatientList(): void {
    this.apiService.getPatientList().subscribe((resp) => {
      if (resp.status == ApiStatus.Success && resp.data.length) {
        this.patientList = resp.data;
      }
    })
  }

  private getAppointmentList(): void {
    this.apiService.getAppointmentList().subscribe((resp) => {
      if (resp.status == ApiStatus.Success && resp.data.length) {
        this.appointmentList = resp.data;
      }
    })
  }

  private getBillById(): void {
    this.apiService.getBillById(this.billId).subscribe((resp) => {
      if (resp.status == ApiStatus.Success && resp.data.length) {
        resp.data[0].breaskdowns.forEach((item, index) => {
          if(index != 0) {
            this.addBreakdown();
          }
        });
        this.billingForm.patchValue(resp.data[0]);
      }
    })
  }


  // Create a FormGroup for BillBreakdown
  createBreakdownGroup(): FormGroup {
    return this.fb.group({
      id: [0],
      billId: [0],
      serviceName: ['', Validators.required],
      type: ['', Validators.required],
      amount: [0, Validators.required]
    });
  }

  // Getter to access the breakdown array
  get breaskdowns(): FormArray {
    return this.billingForm.get('breaskdowns') as FormArray;
  }

  // Add a new breakdown item
  addBreakdown(): void {
    this.breaskdowns.push(this.createBreakdownGroup());
  }

  // Remove a breakdown item
  removeBreakdown(index: number): void {
    this.breaskdowns.removeAt(index);
    this.billCalculation();
  }


  billCalculation(): void {
    const data = this.billingForm.value;
    const breakdown = this.breaskdowns.value;
    const billAmount = breakdown.map(d => d.amount).reduce((acc, amount) => acc + amount, 0);
    const taxAbleAmount = billAmount - data.discount - data.insuranceCoverageAmount;
    const taxAmount = data.taxPercentage > 0 ? ((data.taxPercentage*100)/taxAbleAmount) : 0;
    const finalBillAmount = taxAbleAmount + taxAmount;
    this.billingForm.controls["totalAmount"].setValue(billAmount);
    this.billingForm.controls["taxAmount"].setValue(taxAmount);
    this.billingForm.controls["finalBillAmount"].setValue(finalBillAmount);
  }

  // billing form
  protected onSubmit(): void {
    if(this.billingForm.valid) {
      this.apiService.postBill(this.billingForm.value).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          this.router.navigate(['billing']);
          // Show Success toast
        } else {
          // Show Error toast
        }
      })
    }
  }

  protected onCancel(): void {
    this.router.navigate(['/billing']);
  }
}
