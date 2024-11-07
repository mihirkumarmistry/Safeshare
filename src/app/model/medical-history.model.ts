export class Medicalhistory {
    id: number;
    patientId: number;
    appoinemntId: number;
    allergies: MedicalKeyVal[]; 
    previousMedicalConditions: MedicalKeyVal[]; // hypertension, diabetes
    medications: Medications[];
    surgicalHistory: SurgicalHistory[]; 
    diagnosticTest: DiagnosticTest[];
}

export class Medications {
    id: number;
    patientId: number;
    appoinmentId: number;
    medicalHistoryId: number;
    name: string;
    dosage: string;
    frequency: string;
    isCurrent: string;
}

export class SurgicalHistory {
    id: number;
    patientId: number;
    medicalHistoryId: number;
    proceduresName: string;
    proceduresDate: string;
    doctorName: string;
    hospitalName: string;
}

export class DiagnosticTest {
    id: number;
    patientId: number;
    medicalHistoryId: number;
    labTestName: string;
    labTestDate: Date;
    result: string;
    image: string;
    imageFindings: string;
}

export class MedicalKeyVal {
    id: number;
    patientId: number; 
    medicalHistoryId: number;
    key: string;
    value: string;
}