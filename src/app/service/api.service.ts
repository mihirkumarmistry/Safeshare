import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ApiResponse, KeyVal } from '../model/api.model';
import { Appointment } from '../model/appoinment.model';
import { Auth, AuthResp } from '../model/auth.model';
import { Billing } from '../model/billing.model';
import { DiagnosticTest, Medicalhistory, MedicalKeyVal, Medications, SurgicalHistory } from '../model/medical-history.model';
import { Patient } from '../model/patient.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly ApiUrl = `${environment.apiUrl}api`;
  constructor(private http: HttpClient) { }

  readonly WebAPIs = {
    Auth: `${this.ApiUrl}/Auth`,

    Bill: `${this.ApiUrl}/Bill`,
    Users: `${this.ApiUrl}/Users`,
    Patient: `${this.ApiUrl}/Patient`,
    Allergie: `${this.ApiUrl}/Allergie`,
    Medication: `${this.ApiUrl}/Medication`,
    Appointment: `${this.ApiUrl}/Appointment`,
    DiagnosticTest: `${this.ApiUrl}/DiagnosticTest`,
    MedicalHistory: `${this.ApiUrl}/MedicalHistory`,
    SurgicalHistory: `${this.ApiUrl}/SurgicalHistory`,
    PreviousMedicalCondition: `${this.ApiUrl}/PreviousMedicalCondition`,

    DoctorList: `${this.ApiUrl}/Common/DoctorList`,
    PatientList: `${this.ApiUrl}/Common/PatientList`,
    AppointmentList: `${this.ApiUrl}/Common/AppointmentList`,
  }

  // Auth API
  public postAuth(data: Auth): Observable<ApiResponse<AuthResp>> {
    return this.http.post<ApiResponse<AuthResp>>(this.WebAPIs.Auth, data);
  }

  // Allergie
  public getAllergies(): Observable<ApiResponse<Array<MedicalKeyVal>>> {
    return this.http.get<ApiResponse<Array<MedicalKeyVal>>>(this.WebAPIs.Allergie);
  }
  public getAllergiesById(id: number): Observable<ApiResponse<Array<MedicalKeyVal>>> {
    return this.http.get<ApiResponse<Array<MedicalKeyVal>>>(`${this.WebAPIs.Allergie}/${id}`);
  }
  public postAllergies(data: MedicalKeyVal): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.WebAPIs.Allergie, data);
  }
  public deleteAllergies(data: MedicalKeyVal): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.WebAPIs.Allergie, { body: data });
  }

  // Appointment
  public getAppointment(): Observable<ApiResponse<Array<Appointment>>> {
    return this.http.get<ApiResponse<Array<Appointment>>>(this.WebAPIs.Appointment);
  }
  public getAppointmentById(id: number): Observable<ApiResponse<Array<Appointment>>> {
    return this.http.get<ApiResponse<Array<Appointment>>>(`${this.WebAPIs.Appointment}/${id}`);
  }
  public postAppointment(data: Appointment): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.WebAPIs.Appointment, data);
  }
  public deleteAppointment(data: Appointment): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.WebAPIs.Appointment, { body: data });
  }

  // Bill
  public getBill(): Observable<ApiResponse<Array<Billing>>> {
    return this.http.get<ApiResponse<Array<Billing>>>(this.WebAPIs.Bill);
  }
  public getBillById(id: number): Observable<ApiResponse<Array<Billing>>> {
    return this.http.get<ApiResponse<Array<Billing>>>(`${this.WebAPIs.Bill}/${id}`);
  }
  public postBill(data: Billing): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.WebAPIs.Bill, data);
  }
  public deleteBill(data: Billing): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.WebAPIs.Bill, { body: data });
  }

  // Common
  public getDoctorList(): Observable<ApiResponse<Array<KeyVal>>> {
    return this.http.get<ApiResponse<Array<KeyVal>>>(this.WebAPIs.DoctorList);
  }
  public getPatientList(): Observable<ApiResponse<Array<KeyVal>>> {
    return this.http.get<ApiResponse<Array<KeyVal>>>(this.WebAPIs.PatientList);
  }
  public getAppointmentList(): Observable<ApiResponse<Array<KeyVal>>> {
    return this.http.get<ApiResponse<Array<KeyVal>>>(this.WebAPIs.AppointmentList);
  }

  // DiagnosticTest
  public getDiagnosticTest(): Observable<ApiResponse<Array<DiagnosticTest>>> {
    return this.http.get<ApiResponse<Array<DiagnosticTest>>>(this.WebAPIs.DiagnosticTest);
  }
  public getDiagnosticTestById(id: number): Observable<ApiResponse<Array<DiagnosticTest>>> {
    return this.http.get<ApiResponse<Array<DiagnosticTest>>>(`${this.WebAPIs.DiagnosticTest}/${id}`);
  }
  public postDiagnosticTest(data: DiagnosticTest): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.WebAPIs.DiagnosticTest, data);
  }
  public deleteDiagnosticTest(data: DiagnosticTest): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.WebAPIs.DiagnosticTest, { body: data });
  }

  // MedicalHistory
  public getMedicalhistory(): Observable<ApiResponse<Array<Medicalhistory>>> {
    return this.http.get<ApiResponse<Array<Medicalhistory>>>(this.WebAPIs.MedicalHistory);
  }
  public getMedicalhistoryById(id: number): Observable<ApiResponse<Array<Medicalhistory>>> {
    return this.http.get<ApiResponse<Array<Medicalhistory>>>(`${this.WebAPIs.MedicalHistory}/${id}`);
  }
  public postMedicalhistory(data: Medicalhistory): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.WebAPIs.MedicalHistory, data);
  }
  public deleteMedicalhistory(data: Medicalhistory): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.WebAPIs.MedicalHistory, { body: data });
  }

  // Medication
  public getMedication(): Observable<ApiResponse<Array<Medications>>> {
    return this.http.get<ApiResponse<Array<Medications>>>(this.WebAPIs.Medication);
  }
  public getMedicationById(id: number): Observable<ApiResponse<Array<Medications>>> {
    return this.http.get<ApiResponse<Array<Medications>>>(`${this.WebAPIs.Medication}/${id}`);
  }
  public postMedication(data: Medications): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.WebAPIs.Medication, data);
  }
  public deleteMedication(data: Medications): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.WebAPIs.Medication, { body: data });
  }

  // Patient
  public getPatient(): Observable<ApiResponse<Array<Patient>>> {
    return this.http.get<ApiResponse<Array<Patient>>>(this.WebAPIs.Patient);
  }
  public getPatientById(id: number): Observable<ApiResponse<Array<Patient>>> {
    return this.http.get<ApiResponse<Array<Patient>>>(`${this.WebAPIs.Patient}/${id}`);
  }
  public postPatient(data: Patient): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.WebAPIs.Patient, data);
  }
  public deletePatient(data: Patient): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.WebAPIs.Patient, { body: data });
  }

  // PreviousMedicalCondition
  public getPreviousMedicalCondition(): Observable<ApiResponse<Array<MedicalKeyVal>>> {
    return this.http.get<ApiResponse<Array<MedicalKeyVal>>>(this.WebAPIs.PreviousMedicalCondition);
  }
  public getPreviousMedicalConditionById(id: number): Observable<ApiResponse<Array<MedicalKeyVal>>> {
    return this.http.get<ApiResponse<Array<MedicalKeyVal>>>(`${this.WebAPIs.PreviousMedicalCondition}/${id}`);
  }
  public postPreviousMedicalCondition(data: MedicalKeyVal): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.WebAPIs.PreviousMedicalCondition, data);
  }
  public deletePreviousMedicalCondition(data: MedicalKeyVal): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.WebAPIs.PreviousMedicalCondition, { body: data });
  }

  // SurgicalHistory
  public getSurgicalHistory(): Observable<ApiResponse<Array<SurgicalHistory>>> {
    return this.http.get<ApiResponse<Array<SurgicalHistory>>>(this.WebAPIs.SurgicalHistory);
  }
  public getSurgicalHistoryById(id: number): Observable<ApiResponse<Array<SurgicalHistory>>> {
    return this.http.get<ApiResponse<Array<SurgicalHistory>>>(`${this.WebAPIs.SurgicalHistory}/${id}`);
  }
  public postSurgicalHistory(data: SurgicalHistory): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.WebAPIs.SurgicalHistory, data);
  }
  public deleteSurgicalHistory(data: SurgicalHistory): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.WebAPIs.SurgicalHistory, { body: data });
  }

  // Users
  public getUsers(): Observable<ApiResponse<Array<User>>> {
    return this.http.get<ApiResponse<Array<User>>>(this.WebAPIs.Users);
  }
  public getUsersById(id: number): Observable<ApiResponse<Array<User>>> {
    return this.http.get<ApiResponse<Array<User>>>(`${this.WebAPIs.Users}/${id}`);
  }
  public postUsers(data: User): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.WebAPIs.Users, data);
  }
  public deleteUsers(data: User): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.WebAPIs.Users, { body: data });
  }
}
