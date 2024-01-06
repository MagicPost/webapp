'use server';

import dbConnect from '@/db/dbConnect';
import { PackageModel } from '@/db/models';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';
import { GetPackageDetailsDTO } from '@/dtos/package/package.dto';

export const getPackageById = catchAsync(
  async ({
    _id,
    include,
  }: {
    _id: string;
    include?: {
      sentAt?: boolean;
      receivedAt?: boolean;
      creator?: boolean;
      tracking?: boolean;
    };
  }) => {
    await dbConnect();

    let query = PackageModel.findById(_id);

    if (include?.sentAt) {
      query = query.populate({
        path: 'sentAt',
        select: '+postalCode name address district province',
      });
    }

    if (include?.receivedAt) {
      query = query.populate({
        path: 'receivedAt',
        select: 'postalCode name address district province ward',
      });
    }

    if (include?.creator) {
      query = query.populate({
        path: 'creator',
        select: 'firstName lastName email phone role',
      });
    }

    if (include?.tracking) {
      query = query.select('+tracking');
    } else {
      query = query.select('-tracking');
    }

    let _package = await query.lean().exec();

    _package = transformObjectIdFromLeanedDoc(_package as GetPackageDetailsDTO);

    return {
      ok: true,
      message: 'Lấy đơn hàng thành công!',
      data: _package as GetPackageDetailsDTO,
    } satisfies ActionResponse;
  }
);
