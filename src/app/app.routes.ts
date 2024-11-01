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
        {
          path: 'dashboard',
          loadComponent: () => import('./web/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
        },
        {
          path: 'sample-page',
          loadComponent: () => import('./web/other/sample-page/sample-page.component')
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
        },
        {
          path: 'register',
          loadComponent: () => import('./authentication/register/register.component')
        }
      ]
    }
  ];
