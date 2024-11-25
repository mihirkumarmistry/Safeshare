import { Component } from '@angular/core';
import { SharedModule } from '../../../theme/shared/shared.module';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, EyeOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { ApiStatus } from '../../../model/api.model';
import { Medicalhistory } from '../../../model/medical-history.model';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-medical-history-list',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './medical-history-list.component.html',
  styleUrl: './medical-history-list.component.scss'
})
export class MedicalHistoryListComponent {
  medicalHistoryList: Medicalhistory[] = [];
  pageSize = 10;
  pageStart = 0;
  pageEnd = 10;
  searchText = '';

  constructor (
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

    this.getMedicalHistory();
  }

  protected getMedicalHistory(): void {
    this.apiService.getMedicalhistory().subscribe((resp) => {
      if (resp.status == ApiStatus.Success) {
        this.medicalHistoryList = resp.data;
      }
    });
  }

  // medical history crud
  protected addMedicalHistory(): void {
    this.router.navigate(['/medical-history/0']);
  }
  protected editMedicalHistory(id: number): void {
    this.router.navigate(['/medical-history/'+id]);
  }
  protected deleteMedicalHistory(data: Medicalhistory): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.apiService.deleteMedicalhistory(data).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          // Show success toast
          this.getMedicalHistory();
        } else {
          // Show error toast
        }
      })
    }
  }

  // pagination
  protected handlePageChange($event: number = 1): void {
    if(this.medicalHistoryList.length) {
      this.pageStart = (this.pageSize * ($event-1));
      this.pageEnd = this.pageStart + this.pageSize;
    }
  }
}
