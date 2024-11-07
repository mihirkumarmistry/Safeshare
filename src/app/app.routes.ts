import { Routes } from '@angular/router';
import { UserLayoutComponent } from './theme/layouts/user-layout/user-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

export const routes: Routes = [
    {
      path: '',
      component: UserLayoutComponent,
      children: [
        {
          path: '',
          redirectTo: '/dashboard',
          pathMatch: 'full'
        },

        // general
        {
          path: 'dashboard',
          loadComponent: () => import('./web/general/dashboard/dashboard.component').then((c) => c.DefaultComponent)
        },
        {
          path: 'sample-page',
          loadComponent: () => import('./web/other/sample-page/sample-page.component')
        },

        // patient
        {
          path: 'patient',
          loadComponent: () => import('./web/patient/patient-list/patient-list.component').then((c) => c.PatientListComponent)
        },
        {
          path: 'patient/:id',
          loadComponent: () => import('./web/patient/patient-detail/patient-detail.component').then((c) => c.PatientDetailComponent)
        },
        {
          path: 'medical-history',
          loadComponent: () => import('./web/patient/medical-history-list/medical-history-list.component').then((c) => c.MedicalHistoryListComponent)
        },
        {
          path: 'medical-history/:id',
          loadComponent: () => import('./web/patient/medical-history-detail/medical-history-detail.component').then((c) => c.MedicalHistoryDetailComponent)
        },
        {
          path: 'appointment',
          loadComponent: () => import('./web/patient/appoinment/appoinment.component').then((c) => c.AppoinmentComponent)
        },
        {
          path: 'appointment/:id',
          loadComponent: () => import('./web/patient/appoinment-detail/appoinment-detail.component').then((c) => c.AppoinmentDetailComponent)
        },
        {
          path: 'billing',
          loadComponent: () => import('./web/patient/billing/billing.component').then((c) => c.BillingComponent)
        },
        {
          path: 'billing/:id',
          loadComponent: () => import('./web/patient/billing-detail/billing-detail.component').then((c) => c.BillingDetailComponent)
        },

        // admin
        {
          path: 'setting',
          loadComponent: () => import('./web/admin/setting/setting.component').then((c) => c.SettingComponent)
        },
        {
          path: 'user',
          loadComponent: () => import('./web/admin/user/user.component').then((c) => c.UserComponent)
        },
        {
          path: 'user/:id',
          loadComponent: () => import('./web/admin/user-detail/user-detail.component').then((c) => c.UserDetailComponent)
        }
      ]
    },
    {
      path: '',
      component: GuestComponent,
      children: [
        {
          path: 'login',
          loadComponent: () => import('./authentication/login/login.component')
        }
        // ,
        // {
        //   path: 'register',
        //   loadComponent: () => import('./authentication/register/register.component')
        // }
      ]
    }
  ];
