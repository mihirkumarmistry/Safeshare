import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../theme/shared/shared.module';

import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, EyeOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import tableData from '../../../../fake-data/patient-data.json';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent {
  patientList = tableData;
  pageSize = 10;
  pageStart = 0;
  pageEnd = 10;
  searchText = '';

  constructor (
    private router: Router,
    private iconService: IconService
  ) {
    this.iconService.addIcon(...[
      EyeOutline,
      EditOutline,
      DeleteOutline,
      PlusOutline,
    ]);
  }

  // patient crud
  protected addPatient(): void {
    this.router.navigate(['/patient/0']);
  }
  protected editPatent(id: number): void {
    this.router.navigate(['/patient/'+id]);
  }

  // pagination
  protected handlePageChange($event: number = 1): void {
    if(this.patientList.length) {
      this.pageStart = (this.pageSize * ($event-1));
      this.pageEnd = this.pageStart + this.pageSize;
    }
  }
}
