export class Patient
{
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: Date;
    gender: string;
    imageUrl: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    contact: string;
    emergencyContact: string;
    contactName: string;
    relationship: string;
    providerName: string;
    policyNumber: string;
    policyholderName: string;
    insuranceContact: string;
}

export class PatientInsurance {
    id: number;
    patientId: number;
    providerName: string;
    policyNumber: string;
    policyholderName: string;
    insuranceContact: string;
}

