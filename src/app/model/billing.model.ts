export class Billing {
    id: number;
    name: string;
    patientId: number;
    appointmentId: number;
    taxPercentage: number;
    billingDate: Date;
    billingDueDate: Date;

    breaskdowns: BillBreakdown[];
    discount: number;
    taxAmount: number;
    billAmount: number;
    insuranceNumber: string;
    finalBillAmount: number;
    insuranceCoverageAmount: number;
    paymentDate: Date;
    paymentMode: string;
    amountPaid: number;
    transactionId: string;
    balanceDue: number;
    paymentStatus: string;
    isDeleted: false;
    patientName: string;
}

export class BillBreakdown {
    id: number;
    billId: number;
    serviceName: string;
    type: string; // consultation, lab test, medication, procedures
    amount: number; 
}
