import { TNavigationGroup } from '@/components/main/Menu/NavigationGroup';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBuilding } from 'react-icons/fa';
import { PiPackageFill } from 'react-icons/pi';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { FaShippingFast } from 'react-icons/fa';

export const adminSidebarNavigation: TNavigationGroup[] = [
  {
    groupName: 'Trang chủ',
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
    groupName: 'Trang chủ',
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
  {
    groupName: 'Tra cứu',
    items: [
      {
        label: 'Cước phí',
        icon: <RiMoneyDollarCircleFill />,
        href: '/logistics/lookup/postage',
      },
    ],
  },
];

export const staffSidebarNavigation: TNavigationGroup[] = [
  {
    groupName: 'Trang chủ',
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
        label: 'Đơn hàng',
        icon: <PiPackageFill />,
        href: '/logistics/orders',
      },
      {
        label: 'Vận đơn',
        icon: <FaShippingFast />,
        href: '/logistics/shipments',
      },
    ],
  },
  {
    groupName: 'Tra cứu',
    items: [
      {
        label: 'Cước phí',
        icon: <RiMoneyDollarCircleFill />,
        href: '/logistics/lookup/postage',
      },
    ],
  },
];
