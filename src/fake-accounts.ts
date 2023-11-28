import { BranchTypes, Roles } from '@/constants';

export type TAccount = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Roles;
  branch?: BranchTypes;
  branchName?: string;
  image?: string;
};

export const fakeAccounts: TAccount[] = [
  {
    id: 1,
    email: 'admin@magicpost.com',
    password: '88888888',
    name: 'John Doe',
    role: Roles.ADMIN,
    image: 'https://i.pravatar.cc/300',
  },
  {
    id: 2,
    email: 'manager_1@magicpost.com',
    password: '88888888',
    name: 'David Nguyen',
    role: Roles.MANAGER,
    branch: BranchTypes.COLLECTION_POINT,
    branchName: 'Điểm tập kết Hà Nội',
    image: 'https://i.pravatar.cc/300',
  },
  {
    id: 3,
    email: 'employee_1@magicpost.com',
    password: '88888888',
    name: 'Julia Nhat Thao',
    role: Roles.EMPLOYEE,
    branch: BranchTypes.COLLECTION_POINT,
    branchName: 'Điểm tập kết Hà Nội',
    image: 'https://i.pravatar.cc/300',
  },
  {
    id: 4,
    email: 'manager_2@magicpost.com',
    password: '88888888',
    name: 'Alex Nguyen',
    role: Roles.MANAGER,
    branch: BranchTypes.TRANSACTION_POINT,
    branchName: 'Điểm giao dịch Đống Đa',
    image: 'https://i.pravatar.cc/300',
  },
  {
    id: 5,
    email: 'employee_2@magicpost.com',
    password: '88888888',
    name: 'Tran Van Nhat',
    role: Roles.EMPLOYEE,
    branch: BranchTypes.TRANSACTION_POINT,
    branchName: 'Điểm giao dịch Đống Đa',
    image: 'https://i.pravatar.cc/300',
  },
];
