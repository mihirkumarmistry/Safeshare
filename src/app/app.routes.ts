import { Routes } from '@angular/router';
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

export const routes: Routes = [
    {
      path: '',
      component: AdminComponent,
      children: [
        {
          path: '',
          redirectTo: '/dashboard/default',
          pathMatch: 'full'
        },
        {
          path: 'dashboard/default',
          loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
        },
        {
          path: 'typography',
          loadComponent: () => import('./demo/ui-component/typography/typography.component')
        },
        {
          path: 'color',
          loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
        },
        {
          path: 'sample-page',
          loadComponent: () => import('./demo/other/sample-page/sample-page.component')
        }
      ]
    },
    {
      path: '',
      component: GuestComponent,
      children: [
        {
          path: 'login',
          loadComponent: () => import('./demo/authentication/login/login.component')
        },
        {
          path: 'register',
          loadComponent: () => import('./demo/authentication/register/register.component')
        }
      ]
    }
  ];
