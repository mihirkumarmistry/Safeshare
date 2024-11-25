import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SharedModule } from '../../../theme/shared/shared.module';

import { Router, RouterModule } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, EyeOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { ApiStatus } from '../../../model/api.model';
import { Billing } from '../../../model/billing.model';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent {
  billList: Billing[] = [];
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

    this.getBill();
  }

  protected getBill(): void {
    this.apiService.getBill().subscribe((resp) => {
      if (resp.status == ApiStatus.Success) {
        this.billList = resp.data;
      }
    });
  }

  // patient crud
  protected addPatient(): void {
    this.router.navigate(['/billing/0']);
  }
  protected editPatent(id: number): void {
    this.router.navigate(['/billing/' + id]);
  }
  protected deleteBill(data: Billing): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.apiService.deleteBill(data).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          // Show success toast
          this.getBill();
        } else {
          // Show error toast
        }
      })
    }
  }

  // pagination
  protected handlePageChange($event: number = 1): void {
    if (this.billList.length) {
      this.pageStart = (this.pageSize * ($event - 1));
      this.pageEnd = this.pageStart + this.pageSize;
    }
  }
}
