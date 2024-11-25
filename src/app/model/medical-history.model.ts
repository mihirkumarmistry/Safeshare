export class Medicalhistory {
    id: number;
    patientId: number;
    title: string;
    detail: string;
    patientName: string;
    allergies?: MedicalKeyVal[]; 
    previousMedicalConditions?: MedicalKeyVal[]; // hypertension, diabetes
    medications?: Medications[];
    surgicalHistory?: SurgicalHistory[]; 
    diagnosticTest?: DiagnosticTest[];
}

export class Medications {
    id: number;
    medicalHistoryId: number;
    name: string;
    dosage: string;
    frequency: string;
    isCurrent: boolean;
}

export class SurgicalHistory {
    id: number;
    medicalHistoryId: number;
    proceduresName: string;
    proceduresDate: string;
    doctorName: string;
    hospitalName: string;
}

export class DiagnosticTest {
    id: number;
    medicalHistoryId: number;
    labTestName: string;
    labTestDate: Date;
    result: string;
    image: string;
    imageFindings: string;
}

export class MedicalKeyVal {
    id: number;
    medicalHistoryId: number;
    name: string;
    description: string;
}