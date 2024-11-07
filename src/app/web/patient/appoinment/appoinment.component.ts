import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../theme/shared/shared.module';

import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, EyeOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import tableData from '../../../../fake-data/appoinment-data.json';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-appoinment',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './appoinment.component.html',
  styleUrl: './appoinment.component.scss'
})
export class AppoinmentComponent {
  appoinmentList = tableData;
  pageSize = 10;
  pageStart = 0;
  pageEnd = 10;
  searchText = '';

  constructor(
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

  // appoinment crud
  protected addAppoinment(): void {
    this.router.navigate(['/appointment/0']);
  }
  protected editAppoinment(id: number): void {
    this.router.navigate(['/appointment/' + id]);
  }

  // pagination
  protected handlePageChange($event: number = 1): void {
    if (this.appoinmentList.length) {
      this.pageStart = (this.pageSize * ($event - 1));
      this.pageEnd = this.pageStart + this.pageSize;
    }
  }
}
