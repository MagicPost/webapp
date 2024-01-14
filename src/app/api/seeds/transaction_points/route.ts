import { provinces } from '@/constants/geography';
import { catchAsync } from '../../utils';
import { getBasicBranches } from '@/actions/branch/getBasicBranches';
import { NextResponse } from 'next/server';
import { createTransactionPoint } from '@/actions/branch/createTransactionPoint';
import { CreateTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';
import { getShortDistrictName, getShortProvinceName } from '@/lib/geography';
import { getNumberWithLeadingZero } from '@/lib/text';

export const GET = catchAsync(async () => {
  return NextResponse.json({ status: 'Already seeded' });
  const output = [];

  const collectionPoints: {
    _id: string;
    name: string;
    transactionPoints: any[];
  }[] = (await getBasicBranches({ withCollectionPoints: true })).data.collectionPoints;

  for (let index = 0; index < provinces.length; index++) {
    const province = provinces[index];

    const cp = collectionPoints.find(
      (cp: { _id: string; name: string; transactionPoints: any[] }) => {
        const res = getShortProvinceName(province.name) === cp.name.split(/ - (.*)/s)[1];
        return res;
      }
    );

    if (!cp) continue;

    let tpCount = cp!.transactionPoints.length;

    for (let id = 0; id < 3; id++) {
      const district = province.districts[id];
      const payload: CreateTransactionPointDTO = {
        collectionPoint: cp!._id,
        name: `Điểm giao dịch T${getNumberWithLeadingZero(tpCount + 1)} - ${getShortDistrictName(
          district.name
        )}`,
        address: province.name,
        province: province.name,
        district: district.name,
        ward: district.wards[0].name,
        postalCode: `236${addLeadingZeros(Math.floor(Math.random() * 1000), 3)}`,
      };
      await createTransactionPoint(payload);
      output.push(payload);
      tpCount++;
    }
  }
  return NextResponse.json(output);
});

function addLeadingZeros(num: number, size: number) {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}
