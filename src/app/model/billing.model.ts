export class Billing {
    id: number;
    // patient detail
    patientId: number;
    appoinmentId: number;

    
    // billing info
    billingDate: Date;
    billingDueDate: Date;
    breakdown: BillBreakdown[];
    totalAmount: number;
    insuranceCoverageAmount: number;
    insuranceNumber: string;
    tax: number;
    taxAmount: number;
    discounts: number;
    finalBillAmount: number;

    // payment Info
    paymentId: string;
    paymentStatus: string; // Paid, Pending, Overdue
    paymentDate: Date;
    amountPaid: number;
    paymentMode: string; // Credit Card, Debit Card, Cash, bank Transfer, Online Payment
    transactionId: string;
    balanceDue: number;
    createdBy: number;
    createdDate: Date;
    updatedBy: number;
    updatedDate: Date;
}

export class BillBreakdown {
    id: number;
    billId: number;
    serviceName: string;
    type: string; // consultation, lab test, medication, procedures
    amount: number; 
}

