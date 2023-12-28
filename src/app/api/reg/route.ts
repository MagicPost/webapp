import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { AccountModel } from '@/db/models';
import dbConnect from '@/db/dbConnect';
import { Roles } from '@/constants';

export async function GET() {
  const email = 'manager_1@magicpost.com';
  const password = '88888888';

  const hashedPassword = bcrypt.hashSync(password, 12);

  await dbConnect();
  const user = await AccountModel.create({
    email,
    password: hashedPassword,
    firstName: 'David',
    lastName: 'Nguyen',
    role: Roles.MANAGER,
  });

  return NextResponse.json({
    success: true,
    user,
  });
}

// export type TAccount = {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//     role: Roles;
//     branch?: BranchTypes;
//     branchName?: string;
//     image?: string;
//   };

//   export const fakeAccounts: TAccount[] = [
//     {
//       id: 2,
//       email: 'manager_1@magicpost.com',
//       password: '88888888',
//       name: 'David Nguyen',
//       role: Roles.MANAGER,
//       branch: BranchTypes.COLLECTION_POINT,
//       branchName: 'Điểm tập kết Hà Nội',
//       image: 'https://i.pravatar.cc/300',
//     },
//     {
//       id: 3,
//       email: 'employee_1@magicpost.com',
//       password: '88888888',
//       name: 'Julia Nhat Thao',
//       role: Roles.EMPLOYEE,
//       branch: BranchTypes.COLLECTION_POINT,
//       branchName: 'Điểm tập kết Hà Nội',
//       image: 'https://i.pravatar.cc/300',
//     },
//     {
//       id: 4,
//       email: 'manager_2@magicpost.com',
//       password: '88888888',
//       name: 'Alex Nguyen',
//       role: Roles.MANAGER,
//       branch: BranchTypes.TRANSACTION_POINT,
//       branchName: 'Điểm giao dịch Đống Đa',
//       image: 'https://i.pravatar.cc/300',
//     },
//     {
//       id: 5,
//       email: 'employee_2@magicpost.com',
//       password: '88888888',
//       name: 'Tran Van Nhat',
//       role: Roles.EMPLOYEE,
//       branch: BranchTypes.TRANSACTION_POINT,
//       branchName: 'Điểm giao dịch Đống Đa',
//       image: 'https://i.pravatar.cc/300',
//     },
//   ];
