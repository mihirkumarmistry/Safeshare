import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SharedModule } from '../../../theme/shared/shared.module';

import { Router, RouterModule } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, EyeOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { ApiStatus } from '../../../model/api.model';
import { Patient } from '../../../model/patient.model';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent {
  patientList: Patient[] = [];
  pageSize = 10;
  pageStart = 0;
  pageEnd = 10;
  searchText = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private iconService: IconService
  ) {
    this.iconService.addIcon(...[
      EyeOutline,
      EditOutline,
      DeleteOutline,
      PlusOutline,
    ]);
    this.getPatient();
  }

  protected getPatient(): void {
    this.apiService.getPatient().subscribe((resp) => {
      if (resp.status == ApiStatus.Success) {
        this.patientList = resp.data;
      }
    });
  }

  // patient crud
  protected addPatient(): void {
    this.router.navigate(['/patient/0']);
  }
  protected editPatent(id: number): void {
    this.router.navigate(['/patient/' + id]);
  }
  protected deletePatient(data: Patient): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.apiService.deletePatient(data).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          // Show success toast
          this.getPatient();
        } else {
          // Show error toast
        }
      })
    }
  }

  // pagination
  protected handlePageChange($event: number = 1): void {
    if (this.patientList.length) {
      this.pageStart = (this.pageSize * ($event - 1));
      this.pageEnd = this.pageStart + this.pageSize;
    }
  }
}
