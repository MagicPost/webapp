import { TNavigationGroup } from '@/components/main/Sidebar/NavigationGroup';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBuilding } from 'react-icons/fa';

export const adminSidebarNavigation: TNavigationGroup[] = [
  {
    groupName: 'Chung',
    items: [
      {
        label: 'Bảng điều khiển',
        icon: <BiSolidDashboard />,
        href: '/admin/dashboard',
      },
    ],
  },
  {
    groupName: 'Quản lý',
    items: [
      {
        label: 'Chi nhánh',
        icon: <FaBuilding />,
        href: '/admin/branches',
      },
      {
        label: 'Nhân sự',
        icon: <BsFillPeopleFill />,
        href: '/admin/employees',
      },
    ],
  },
];

export const managerSidebarNavigation: TNavigationGroup[] = [
  {
    groupName: '',
    items: [
      {
        label: 'Bảng điều khiển',
        icon: <BiSolidDashboard />,
        href: '/logistics/dashboard',
      },
    ],
  },
  {
    groupName: 'Quản lý',
    items: [
      {
        label: 'Nhân sự',
        icon: <BsFillPeopleFill />,
        href: '/logistics/employees',
      },
    ],
  },
];

export const employeeSidebarNavigation: TNavigationGroup[] = [
  {
    groupName: '',
    items: [
      {
        label: 'Bảng điều khiển',
        icon: <BiSolidDashboard />,
        href: '/logistics/dashboard',
      },
    ],
  },
];
