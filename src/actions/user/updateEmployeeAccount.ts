'use server';

import dbConnect from '@/db/dbConnect';
import { AccountModel } from '@/db/models';
import { GetUserDTO } from '@/dtos/user/user.dto';
import { ActionResponse } from '../_helpers/types';
import bcrypt from 'bcryptjs';
import { AES, enc } from 'crypto-js';
import { Account } from '@/db/models/Account';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { catchAsync } from '../_helpers/catchAsync';

export const updateEmployeeAccount = catchAsync(async (getUserDTO: GetUserDTO) => {
  await dbConnect();

  const { _id, ...rest } = getUserDTO;
  let updatedAccount = await AccountModel.findByIdAndUpdate(_id, { ...rest }, { new: true }).lean();
  updatedAccount = transformObjectIdFromLeanedDoc(updatedAccount as Account);

  return {
    ok: true,
    status: 200,
    message: 'Cập nhật tài khoản thành công!',
    data: updatedAccount,
  } satisfies ActionResponse;
});

export const updateEmployeePassword = catchAsync(
  async ({ password, token }: { password: string; token: string }) => {
    await dbConnect();

    const decrypted = AES.decrypt(token, process.env.PRIVATE_KEY!);
    if (!decrypted) throw new Error('Token không hợp lệ!');

    const { _id } = JSON.parse(decrypted.toString(enc.Utf8));

    const encryptedPassword = bcrypt.hashSync(password, 12);

    let updatedAccount = await AccountModel.findByIdAndUpdate(
      _id,
      { password: encryptedPassword, active: true },
      { new: true }
    ).lean();

    updatedAccount = transformObjectIdFromLeanedDoc(updatedAccount as Account);

    return {
      ok: true,
      status: 200,
      message: 'Cập nhật mật khẩu thành công!',
      data: updatedAccount,
    } satisfies ActionResponse;
  }
);
