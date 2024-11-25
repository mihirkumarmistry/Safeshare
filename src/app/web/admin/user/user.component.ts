import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../theme/shared/shared.module';

import { IconService } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, EyeOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import tableData from '../../../../fake-data/user-data.json';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { ApiStatus } from '../../../model/api.model';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  userList: User[] = [];
  pageSize = 10;
  pageStart = 0;
  pageEnd = 10;
  searchText = '';

  constructor (
    private router: Router,
    private apiService: ApiService,
    private iconService: IconService,
  ) {
    this.iconService.addIcon(...[
      EyeOutline,
      EditOutline,
      DeleteOutline,
      PlusOutline,
    ]);
    this.getUsers();
  }

  protected getUsers(): void {
    this.apiService.getUsers().subscribe((resp) => {
      if (resp.status == ApiStatus.Success) 
      {
        this.userList = resp.data;
      }
    }); 
  }

  // patient crud
  protected adduser(): void {
    this.router.navigate(['/user/0']);
  }
  protected editPatent(id: number): void {
    this.router.navigate(['/user/'+id]);
  }

  // pagination
  protected handlePageChange($event: number = 1): void {
    if(this.userList.length) {
      this.pageStart = (this.pageSize * ($event-1));
      this.pageEnd = this.pageStart + this.pageSize;
    }
  }
}
