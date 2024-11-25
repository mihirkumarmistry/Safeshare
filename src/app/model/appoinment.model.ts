export class Appointment {
    id: number;
    patientId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    contact: string;
    appointmentType: string;
    appointmentDate: Date;
    appointmentTime: Date;
    reason: string;
    doctorId: number;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    doctorName?: string;
}