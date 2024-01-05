import dbConnect from '@/db/dbConnect';
import { PackageModel } from '@/db/models';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';
import { GetPackageDTO } from '@/dtos/package/package.dto';

export const getPackageById = catchAsync(async () => {
  await dbConnect();

  let _package = await PackageModel.findOne({}).lean().exec();

  _package = transformObjectIdFromLeanedDoc(_package as any);

  return {
    ok: true,
    message: 'Lấy đơn hàng thành công!',
    status: 200,
    data: _package as GetPackageDTO,
  } satisfies ActionResponse;
});
