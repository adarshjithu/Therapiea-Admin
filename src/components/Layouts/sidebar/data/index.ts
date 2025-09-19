import * as Icons from '../icons';

export const NAV_DATA = [
  {
    label: 'MAIN MENU',
    items: [
      {
        title: 'Dashboard',
        url: '/',
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: 'Users',
        url: '/customers',
        icon: Icons.UserIcon, // or whatever you named the icon
        items: [],
      },
      {
        title: 'Product',
        url: '/product',
        icon: Icons.BoxIcon, // change to the right icon name
        items: [],
      },
      {
        title: 'Categories',
        url: '/categories',
        icon: Icons.CategoryIcon,
        items: [],
      },
      {
        title: 'Size',
        url: '/size',
        icon: Icons.SizingIcon,
        items: [],
      },
      {
        title: 'Orders',
        url: '/orders',
        icon: Icons.OrderIcon,
        items: [],
      },
      {
        title: 'Settings',
        url: '/settings',
        icon: Icons.SettingsIcon,
        items: [],
      },
    ],
  },
];
