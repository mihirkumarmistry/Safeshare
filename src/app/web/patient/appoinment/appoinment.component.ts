import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SharedModule } from '../../../theme/shared/shared.module';

import { Router, RouterModule } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, EyeOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { Appointment } from '../../../model/appoinment.model';
import { ApiService } from '../../../service/api.service';
import { ApiStatus } from '../../../model/api.model';

@Component({
  selector: 'app-appoinment',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './appoinment.component.html',
  styleUrl: './appoinment.component.scss'
})
export class AppoinmentComponent {
  appoinmentList: Appointment[] = [];
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
    this.getAppointment();
  }

  protected getAppointment(): void {
    this.apiService.getAppointment().subscribe((resp) => {
      if (resp.status == ApiStatus.Success) {
        this.appoinmentList = resp.data;
      }
    });
  }

  // appoinment crud
  protected addAppoinment(): void {
    this.router.navigate(['/appointment/0']);
  }
  protected editAppoinment(id: number): void {
    this.router.navigate(['/appointment/' + id]);
  }
  protected deleteAppointment(data: Appointment): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.apiService.deleteAppointment(data).subscribe((resp) => {
        if (resp.status == ApiStatus.Success) {
          // Show success toast
          this.getAppointment();
        } else {
          // Show error toast
        }
      })
    }
  }

  // pagination
  protected handlePageChange($event: number = 1): void {
    if (this.appoinmentList.length) {
      this.pageStart = (this.pageSize * ($event - 1));
      this.pageEnd = this.pageStart + this.pageSize;
    }
  }
}
