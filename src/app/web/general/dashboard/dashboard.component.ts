// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import tableData from '../../../../fake-data/patient-data.json';
import { SharedModule } from '../../../../app/theme/shared/shared.module';

// icons
import { IconService } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DefaultComponent {
  // constructor
  constructor(private iconService: IconService) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  }

  recentOrder = tableData;

  AnalyticEcommerce = [
    {
      title: 'Total Patients',
      amount: '4,500',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'rise',
      percentage: '59.3%',
      color: 'text-primary',
      number: '53',
      message: 'patients are registered last month'
    },
    {
      title: 'Total Appointments',
      amount: '8,532',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'rise',
      percentage: '29 .5%',
      color: 'text-primary',
      number: '7,850',
      message: 'appoinments were booked last year'
    },
    {
      title: 'Appoinment Today',
      amount: '26',
      background: 'bg-light-warning ',
      border: 'border-warning',
      icon: 'fall',
      percentage: '27.4%',
      color: 'text-warning',
      number: 45,
      message: 'appoinments were booked yesterday'
    },
    {
      title: 'Total Bills',
      amount: '$3,45,586',
      background: 'bg-light-warning ',
      border: 'border-warning',
      icon: 'fall',
      percentage: '27.4%',
      color: 'text-warning',
      number: '$1,50,450',
      message: 'bill generated preveous month'
    }
  ];

  transaction = [
    {
      background: 'text-success bg-light-success',
      icon: 'gift',
      title: 'Order #002434',
      time: 'Today, 2:00 AM',
      amount: '+ $1,430',
      percentage: '78%'
    },
    {
      background: 'text-primary bg-light-primary',
      icon: 'message',
      title: 'Order #984947',
      time: '5 August, 1:45 PM',
      amount: '- $302',
      percentage: '8%'
    },
    {
      background: 'text-danger bg-light-danger',
      icon: 'setting',
      title: 'Order #988784',
      time: '7 hours ago',
      amount: '- $682',
      percentage: '16%'
    }
  ];
}
