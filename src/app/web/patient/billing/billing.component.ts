import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../theme/shared/shared.module';

import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, EyeOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import tableData from '../../../../fake-data/billing-data.json';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent {
  billList = tableData;
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
    this.router.navigate(['/billing/0']);
  }
  protected editPatent(id: number): void {
    this.router.navigate(['/billing/'+id]);
  }

  // pagination
  protected handlePageChange($event: number = 1): void {
    if(this.billList.length) {
      this.pageStart = (this.pageSize * ($event-1));
      this.pageEnd = this.pageStart + this.pageSize;
    }
  }
}
