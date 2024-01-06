'use server';

import dbConnect from '@/db/dbConnect';
import { AccountModel, PackageModel } from '@/db/models';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';
import { auth } from '@/lib/auth';
import { CreatePackageDTO, GetPackageDTO } from '@/dtos/package/package.dto';
import { GetUserDTO } from '@/dtos/user/user.dto';

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

  let account = await AccountModel.findOne({ email: user.email }).lean().exec();
  account = transformObjectIdFromLeanedDoc(account) as GetUserDTO;

  if (!account) {
    return {
      ok: false,
      message: 'Tài khoản không tồn tại!',
    } satisfies ActionResponse;
  }

  let newOrder = await PackageModel.create({
    ...createPackageDTO,
    creator: account._id,
    receivedAt: account._id,
    sentAt: account._id,
  });

  newOrder = transformObjectIdFromLeanedDoc(newOrder.toObject());

  return {
    ok: true,
    message: 'Tạo điểm tập kết thành công!',
    data: newOrder as GetPackageDTO,
  } satisfies ActionResponse;
});
