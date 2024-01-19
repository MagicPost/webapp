import { NextResponse } from 'next/server';
import { catchAsync } from '../../utils';
import dbConnect from '@/db/dbConnect';
import { createPackage } from '@/actions/package/createPackage';

const items = [
  {
    name: 'Áo polo nam',
    quantity: 5,
    value: 167000,
    weight: 0.1,
  },
  {
    name: 'Tablet Samsung',
    quantity: 1,
    value: 5000000,
    weight: 0.3,
  },
  {
    name: 'Laptop Dell K24',
    quantity: 1,
    value: 18990000,
    weight: 1.2,
  },
];

const sender = [
  {
    fullname: 'Nguyễn Văn Bảo',
    phone: '0909090909',
    email: 'vanbao@gmail.com',
    address: 'Số 23',
    ward: 'Phường 3',
    district: 'Thị xã Gò Công',
    province: 'Tỉnh Tiền Giang',
  },
  {
    fullname: 'Nguyễn Văn Cường',
    phone: '0909090909',
    email: 'cuong@mail.com',
    address: 'Số 23',
    ward: 'Phường 3',
    district: 'Thị xã Gò Công',
    province: 'Tỉnh Tiền Giang',
  },
  {
    fullname: 'Nguyễn Văn Đức',
    phone: '0909090909',
    email: 'duc@gmail.com',
    address: 'Số 23',
    ward: 'Phường 3',
    district: 'Thị xã Gò Công',
    province: 'Tỉnh Tiền Giang',
  },
];

const receiver = [
  {
    fullname: 'Trần Văn An',
    phone: '0909090909',
    email: 'tranan@gmail.com',
    address: 'Số 12',
    ward: 'Phường Bắc Sơn',
    district: 'Thị xã Bỉm Sơn',
    province: 'Tỉnh Thanh Hóa',
  },
  {
    fullname: 'Trần Văn Bình',
    phone: '0909090909',
    email: 'binh@gmail.com',
    address: 'Số 12',
    ward: 'Phường Bắc Sơn',
    district: 'Thị xã Bỉm Sơn',
    province: 'Tỉnh Thanh Hóa',
  },
  {
    fullname: 'Trần Văn Cảnh',
    phone: '0909090909',
    email: 'canhtran@gmail.com',
    address: 'Số 34',
    ward: 'Phường Bắc Sơn',
    district: 'Thị xã Bỉm Sơn',
    province: 'Tỉnh Thanh Hóa',
  },
];

export const GET = catchAsync(async () => {
  await dbConnect();
  await createPackage();
  return NextResponse.json({});
});
