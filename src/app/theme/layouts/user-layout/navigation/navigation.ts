export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'general',
    title: 'General',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      },
    ]
  },
  {
    id: 'patient',
    title: 'Patient',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'patient',
        title: 'Patient',
        type: 'item',
        classes: 'nav-item',
        url: '/patient',
        icon: 'user',
      },
      {
        id: 'medical-history',
        title: 'Medical History',
        type: 'item',
        classes: 'nav-item',
        url: '/medical-history',
        icon: 'plus-circle',
      },
      {
        id: 'appointment',
        title: 'Appointment',
        type: 'item',
        classes: 'nav-item',
        url: '/appointment',
        icon: 'calendar',
      },
      {
        id: 'billing',
        title: 'Billing',
        type: 'item',
        classes: 'nav-item',
        url: '/billing',
        icon: 'dollar',
      }
    ]
  },
  {
    id: 'admin',
    title: 'Admin',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'setting',
        title: 'Setting',
        type: 'item',
        classes: 'nav-item',
        url: '/setting',
        icon: 'setting',
      },
      {
        id: 'user',
        title: 'User',
        type: 'item',
        classes: 'nav-item',
        url: '/user',
        icon: 'user',
      }
    ]
  }
];
