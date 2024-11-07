import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline } from '@ant-design/icons-angular/icons';
import { SharedModule } from '../../../theme/shared/shared.module';

@Component({
  selector: 'app-billing-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './billing-detail.component.html',
  styleUrl: './billing-detail.component.scss'
})
export class BillingDetailComponent {
  protected billId: number;
  protected billingForm: FormGroup;

  constructor(
    private router: Router,
    protected fb: FormBuilder,
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
      id: [null],

      // Patient details
      patientId: [null, Validators.required],
      appoinmentId: [null, Validators.required],

      // Billing info
      billingDate: [null, Validators.required],
      billingDueDate: [null, Validators.required],
      breakdown: this.fb.array([this.createBreakdownGroup()]),
      totalAmount: [0, Validators.required],
      insuranceCoverageAmount: [0, Validators.required],
      insuranceNumber: ['', Validators.required],
      tax: [0, Validators.required],
      taxAmount: [0, Validators.required],
      discounts: [0],
      finalBillAmount: [0, Validators.required],

      // Payment info
      paymentId: [''],
      paymentDate: [null],
      paymentMode: [''],
      amountPaid: [0, Validators.required],
      transactionId: [''],
      balanceDue: [0],
      paymentStatus: ['', Validators.required],
      createdBy: [null, Validators.required],
      createdDate: [null],
      updatedBy: [null],
      updatedDate: [null]
    });

    if (this.billId > 0) {
      this.temp();
    }
  }

  // Create a FormGroup for BillBreakdown
  createBreakdownGroup(): FormGroup {
    return this.fb.group({
      id: [null],
      billId: [null],
      serviceName: ['', Validators.required],
      type: ['', Validators.required],
      amount: [0, Validators.required]
    });
  }

  // Getter to access the breakdown array
  get breakdown(): FormArray {
    return this.billingForm.get('breakdown') as FormArray;
  }

  // Add a new breakdown item
  addBreakdown(): void {
    this.breakdown.push(this.createBreakdownGroup());
  }

  // Remove a breakdown item
  removeBreakdown(index: number): void {
    this.breakdown.removeAt(index);
  }

  // billing form
  protected onSubmit(): void {
    console.log(this.billingForm.value);
  }

  protected onCancel(): void {
    this.router.navigate(['/billing']);
  }

  // teamp function
  private temp(): void {
    const data = {
      id: 1,
      patientId: 101,
      appoinmentId: 201,
      billingDate: "2023-10-01",
      billingDueDate: "2023-10-15",
      totalAmount: 1500.0,
      breakdown: [
        { id: 1, billId: 1, serviceName: "Consultation", type: "consultation", amount: 300.0 },
        { id: 2, billId: 1, serviceName: "X-Ray", type: "lab test", amount: 200.0 },
        { id: 3, billId: 1, serviceName: "Medication", type: "medication", amount: 1000.0 }
      ],
      insuranceCoverageAmount: 500.0,
      insuranceNumber: "INS-101",
      tax: 0.1,
      taxAmount: 150.0,
      discounts: 100.0,
      finalBillAmount: 1050.0,
      paymentId: "PAY-1001",
      paymentStatus: "Paid",
      paymentDate: "2023-10-05",
      amountPaid: 1050.0,
      paymentMode: "Credit Card",
      transactionId: "TXN-2001",
      balanceDue: 0.0,
      createdBy: 1,
      createdDate: "2023-10-01",
      updatedBy: 2,
      updatedDate: "2023-10-02"
    };

    this.addBreakdown();
    this.addBreakdown();

    this.billingForm.patchValue(data);
  }
}
