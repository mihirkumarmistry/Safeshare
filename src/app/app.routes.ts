import { Routes } from '@angular/router';
import { UserLayoutComponent } from './theme/layouts/user-layout/user-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { AuthGuard } from './core/auth.guard';
import { UnauthorizedComponent } from './web/other/unauthorized/unauthorized.component';

export enum SystemUserType
{
  Admin = "Admin",
  Doctor = "Doctor",
  Staff = "Staff"
}

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
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin] },
          loadComponent: () => import('./web/general/dashboard/dashboard.component').then((c) => c.DefaultComponent)
        },
        {
          path: 'sample-page',
          loadComponent: () => import('./web/other/sample-page/sample-page.component')
        },

        // patient
        {
          path: 'patient',
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin, SystemUserType.Doctor, SystemUserType.Staff] },
          loadComponent: () => import('./web/patient/patient-list/patient-list.component').then((c) => c.PatientListComponent)
        },
        {
          path: 'patient/:id',
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin, SystemUserType.Doctor, SystemUserType.Staff] },
          loadComponent: () => import('./web/patient/patient-detail/patient-detail.component').then((c) => c.PatientDetailComponent)
        },
        {
          path: 'medical-history',
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin, SystemUserType.Doctor, SystemUserType.Staff] },
          loadComponent: () => import('./web/patient/medical-history-list/medical-history-list.component').then((c) => c.MedicalHistoryListComponent)
        },
        {
          path: 'medical-history/:id',
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin, SystemUserType.Doctor, SystemUserType.Staff] },
          loadComponent: () => import('./web/patient/medical-history-detail/medical-history-detail.component').then((c) => c.MedicalHistoryDetailComponent)
        },
        {
          path: 'appointment',
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin, SystemUserType.Doctor, SystemUserType.Staff] },
          loadComponent: () => import('./web/patient/appoinment/appoinment.component').then((c) => c.AppoinmentComponent)
        },
        {
          path: 'appointment/:id',
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin, SystemUserType.Doctor, SystemUserType.Staff] },
          loadComponent: () => import('./web/patient/appoinment-detail/appoinment-detail.component').then((c) => c.AppoinmentDetailComponent)
        },
        {
          path: 'billing',
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin, SystemUserType.Doctor, SystemUserType.Staff] },
          loadComponent: () => import('./web/patient/billing/billing.component').then((c) => c.BillingComponent)
        },
        {
          path: 'billing/:id',
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin, SystemUserType.Doctor, SystemUserType.Staff] },
          loadComponent: () => import('./web/patient/billing-detail/billing-detail.component').then((c) => c.BillingDetailComponent)
        },

        // admin
        {
          path: 'setting',
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin] },
          loadComponent: () => import('./web/admin/setting/setting.component').then((c) => c.SettingComponent)
        },
        {
          path: 'user',
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin] },
          loadComponent: () => import('./web/admin/user/user.component').then((c) => c.UserComponent)
        },
        {
          path: 'user/:id',
          canActivate: [AuthGuard],
          data: { allowedUserTypes: [SystemUserType.Admin] },
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
      ]
    },
    {
      path: 'unauthorized',
      component: UnauthorizedComponent
    }
  ];
