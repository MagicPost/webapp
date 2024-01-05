'use server';

import dbConnect from '@/db/dbConnect';
import { AccountModel, PackageModel } from '@/db/models';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';
import { auth } from '@/lib/auth';
import { CreatePackageDTO, GetPackageDTO } from '@/dtos/package/package.dto';

export const createPackage = catchAsync(async (createPackageDTO: CreatePackageDTO) => {
  await dbConnect();

  const session = await auth();

  if (!session || !session.user) {
    return {
      ok: false,
      message: 'Bạn chưa đăng nhập!',
      status: 401,
    } satisfies ActionResponse;
  }

  const user = session.user;

  let account = await AccountModel.findOne({ email: user.email }).exec();

  if (!account) {
    return {
      ok: false,
      message: 'Tài khoản không tồn tại!',
      status: 404,
    } satisfies ActionResponse;
  }

  let newOrder = await PackageModel.create({
    ...createPackageDTO,
    creator: account._id.toString(),
    receivedAt: account._id.toString(),
    sentAt: account._id.toString(),
  });

  newOrder = transformObjectIdFromLeanedDoc(newOrder.toObject());

  return {
    ok: true,
    message: 'Tạo điểm tập kết thành công!',
    status: 201,
    data: newOrder as GetPackageDTO,
  } satisfies ActionResponse;
});
