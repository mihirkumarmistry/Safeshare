import { Component } from '@angular/core';
import { SharedModule } from '../../../theme/shared/shared.module';

import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, EyeOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import tableData from '../../../../fake-data/medical-history-data.json';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medical-history-list',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './medical-history-list.component.html',
  styleUrl: './medical-history-list.component.scss'
})
export class MedicalHistoryListComponent {
  medicalHistoryList = tableData;
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

  // medical history crud
  protected addMedicalHistory(): void {
    this.router.navigate(['/medical-history/0']);
  }
  protected editMedicalHistory(id: number): void {
    this.router.navigate(['/medical-history/'+id]);
  }

  // pagination
  protected handlePageChange($event: number = 1): void {
    if(this.medicalHistoryList.length) {
      this.pageStart = (this.pageSize * ($event-1));
      this.pageEnd = this.pageStart + this.pageSize;
    }
  }
}
