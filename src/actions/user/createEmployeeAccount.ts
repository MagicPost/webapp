'use server';

import { BranchTypes, Roles } from '@/constants';
import dbConnect from '@/db/dbConnect';
import { AccountModel } from '@/db/models';
import { CreateUserDTO } from '@/dtos/user/user.dto';
import { ActionResponse } from '../_helpers/types';
import bcrypt from 'bcryptjs';
import { sendActivationMail } from '../mail';
import { catchAsync } from '../_helpers/catchAsync';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';

const DEFAULT_PASSWORD = 'abcd1234';

export const createEmployeeAccount = catchAsync(async (createUserDTO: CreateUserDTO) => {
  if (createUserDTO.role === Roles.ADMIN) return;

  await dbConnect();

  const emailExists = await AccountModel.exists({
    email: createUserDTO.email,
  });
  if (emailExists)
    return {
      ok: false,
      message: 'Email đã tồn tại!',
    } satisfies ActionResponse;

  const password = bcrypt.hashSync(DEFAULT_PASSWORD, 12);
  const branch = {
    type: createUserDTO.branch.type,
    [createUserDTO.branch.type === BranchTypes.COLLECTION_POINT
      ? 'collectionPoint'
      : 'transactionPoint']: createUserDTO.branch._id,
  };
  let newAccount = await AccountModel.create({
    ...createUserDTO,
    branch,
    password,
    active: false,
  });

  newAccount = transformObjectIdFromLeanedDoc(newAccount.toObject());

  const resp = await sendActivationMail({
    email: createUserDTO.email,
    role: createUserDTO.role,
    branch: createUserDTO.branch,
  });

  console.log('create account: ', resp);
  if (!resp.ok) throw new Error(resp.message);

  return {
    ok: true,
    status: 200,
    message: 'Thêm tài khoản thành công!',
    data: newAccount,
  } satisfies ActionResponse;
});
