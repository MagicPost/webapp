import { provinces } from '@/constants/geography';
import { catchAsync } from '../../utils';
import { getBasicBranches } from '@/actions/branch/getBasicBranches';
import { NextResponse } from 'next/server';
import { createTransactionPoint } from '@/actions/branch/createTransactionPoint';
import { CreateTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';
import { getShortDistrictName, getShortProvinceName } from '@/lib/geography';
import { getNumberWithLeadingZero } from '@/lib/text';
import dbConnect from '@/db/dbConnect';
import { TransactionPointModel } from '@/db/models';

const roads = [
  { province: 'An Giang', address: '123A Nguyễn Văn Linh' },
  { province: 'Bà Rịa - Vũng Tàu', address: '456B Lê Lợi' },
  { province: 'Bắc Giang', address: '789C Hồ Chí Minh' },
  { province: 'Bắc Kạn', address: '101D Trần Phú' },
  { province: 'Bạc Liêu', address: '202E Ngô Quyền' },
  { province: 'Bắc Ninh', address: '303F Hùng Vương' },
  { province: 'Bến Tre', address: '404G Nguyễn Trãi' },
  { province: 'Bình Định', address: '505H Quang Trung' },
  { province: 'Bình Dương', address: '606I Lý Thường Kiệt' },
  { province: 'Bình Phước', address: '707K Điện Biên Phủ' },
  { province: 'Bình Thuận', address: '808L Trường Chinh' },
  { province: 'Cà Mau', address: '909M Nguyễn Huệ' },
  { province: 'Cần Thơ', address: '101N Trần Hưng Đạo' },
  { province: 'Cao Bằng', address: '202O Hoàng Diệu' },
  { province: 'Đà Nẵng', address: '303P Lê Duẩn' },
  { province: 'Đắk Lắk', address: '404Q Phan Chu Trinh' },
  { province: 'Đắk Nông', address: '505R Trần Quang Khải' },
  { province: 'Điện Biên', address: '606S Hồ Tùng Mậu' },
  { province: 'Đồng Nai', address: '707T Lê Quý Đôn' },
  { province: 'Đồng Tháp', address: '808U Nguyễn Thị Minh Khai' },
  { province: 'Gia Lai', address: '909V Trần Bình Trọng' },
  { province: 'Hà Giang', address: '101W Nguyễn Công Trứ' },
  { province: 'Hà Nam', address: '202X Trần Nhật Duật' },
  { province: 'Hà Nội', address: '303Y Bà Triệu' },
  { province: 'Hà Tĩnh', address: '404Z Lê Lai' },
  { province: 'Hải Dương', address: '505AA Nguyễn Đình Chiểu' },
  { province: 'Hải Phòng', address: '606BB Hồng Bàng' },
  { province: 'Hậu Giang', address: '707CC Trần Phú' },
  { province: 'Hòa Bình', address: '808DD Lê Hồng Phong' },
  { province: 'Hưng Yên', address: '909EE Trưng Trắc' },
  { province: 'Khánh Hòa', address: '101FF Nguyễn Thị Minh Khai' },
  { province: 'Kiên Giang', address: '202GG Võ Văn Kiệt' },
  { province: 'Kon Tum', address: '303HH Quang Trung' },
  { province: 'Lai Châu', address: '404II Điện Biên Phủ' },
  { province: 'Lâm Đồng', address: '505JJ Lý Thường Kiệt' },
  { province: 'Lạng Sơn', address: '606KK Trần Phú' },
  { province: 'Lào Cai', address: '707LL Hùng Vương' },
  { province: 'Long An', address: '808MM Nguyễn Trãi' },
  { province: 'Nam Định', address: '909NN Quang Trung' },
  { province: 'Nghệ An', address: '101OO Lê Lợi' },
  { province: 'Ninh Bình', address: '202PP Hồ Chí Minh' },
  { province: 'Ninh Thuận', address: '303QQ Trần Phú' },
  { province: 'Phú Thọ', address: '404RR Nguyễn Trãi' },
  { province: 'Phú Yên', address: '505SS Lê Lợi' },
  { province: 'Quảng Bình', address: '606TT Hồ Chí Minh' },
  { province: 'Quảng Nam', address: '707UU Trần Phú' },
  { province: 'Quảng Ngãi', address: '808VV Nguyễn Trãi' },
  { province: 'Quảng Ninh', address: '909WW Lê Lợi' },
  { province: 'Quảng Trị', address: '101XX Hồ Chí Minh' },
  { province: 'Sóc Trăng', address: '202YY Trần Phú' },
  { province: 'Sơn La', address: '303ZZ Nguyễn Trãi' },
  { province: 'Tây Ninh', address: '404AAA Hồ Chí Minh' },
  { province: 'Thái Bình', address: '505BBB Trần Phú' },
  { province: 'Thái Nguyên', address: '606CCC Nguyễn Trãi' },
  { province: 'Thanh Hóa', address: '707DDD Hồ Chí Minh' },
  { province: 'Thừa Thiên Huế', address: '808EEE Trần Phú' },
  { province: 'Tiền Giang', address: '909FFF Nguyễn Trãi' },
  { province: 'Trà Vinh', address: '101GGG Hồ Chí Minh' },
  { province: 'Tuyên Quang', address: '202HHH Trần Phú' },
  { province: 'Vĩnh Long', address: '303II Nguyễn Trãi' },
  { province: 'Vĩnh Phúc', address: '404JJ Hồ Chí Minh' },
  { province: 'Yên Bái', address: '505KKK Trần Phú' },
  { province: 'Phú Quốc', address: '606LLL Nguyễn Trãi' },
  { province: 'Hồ Chí Minh', address: '707MM Trần Phú' },
];

export const GET = catchAsync(async () => {
  return NextResponse.json({ status: 'Already seeded' });
  // const output = [];

  // const collectionPoints: {
  //   _id: string;
  //   name: string;
  //   transactionPoints: any[];
  // }[] = (await getBasicBranches({ withCollectionPoints: true })).data.collectionPoints;

  // for (let index = 0; index < provinces.length; index++) {
  //   const province = provinces[index];

  //   const cp = collectionPoints.find(
  //     (cp: { _id: string; name: string; transactionPoints: any[] }) => {
  //       const res = getShortProvinceName(province.name) === cp.name.split(/ - (.*)/s)[1];
  //       return res;
  //     }
  //   );

  //   if (!cp) continue;

  //   let tpCount = cp!.transactionPoints.length;

  //   for (let id = 0; id < 3; id++) {
  //     const district = province.districts[id];
  //     const payload: CreateTransactionPointDTO = {
  //       collectionPoint: cp!._id,
  //       name: `Điểm giao dịch T${getNumberWithLeadingZero(tpCount + 1)} - ${getShortDistrictName(
  //         district.name
  //       )}`,
  //       address: province.name,
  //       province: province.name,
  //       district: district.name,
  //       ward: district.wards[0].name,
  //       postalCode: `236${addLeadingZeros(Math.floor(Math.random() * 1000), 3)}`,
  //     };
  //     await createTransactionPoint(payload);
  //     output.push(payload);
  //     tpCount++;
  //   }
  // }
  // return NextResponse.json(output);

  // await dbConnect();
  // const tp = await TransactionPointModel.updateMany(
  //   {
  //     address: /^Tỉnh|Thành phố/,
  //   },
  //   {
  //     address: roads[Math.floor(Math.random() * roads.length)].address,
  //   }, {
  //     new: true
  //   }
  // );
  // return NextResponse.json(tp);
});

function addLeadingZeros(num: number, size: number) {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}
