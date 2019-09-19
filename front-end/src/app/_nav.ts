interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-people',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Manager',
    icon: 'icon-user',
    children: [
      {
        name: 'Librarian',
        url: '/librarian',
        icon: 'icon-user',
      },
    ]
  },
  {
    name: 'Category',
    icon: 'icon-list',
    children: [
      {
        name: 'Author',
        url: '/author',
        icon: 'icon-list',
      },
      {
        name: 'Subject',
        url: '/subject',
        icon: 'icon-list',
      },
      {
        name: 'Reader Type',
        url: '/reader-type',
        icon: 'icon-list',
      },
    ]
  },
  {
    name: 'Book Title',
    url: '/book-title',
    icon: 'icon-book',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
];
