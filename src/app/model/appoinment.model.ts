export class Appoinment
{
    id: number;
    patientId: number;

    // new patient
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    contact: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;


    // appoinment details
    type: string;
    appoinmentDate: Date;
    appoinmentTime: Date;
    reason: string;

    // doctor name
    doctorId: number;
}