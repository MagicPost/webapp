'use server';

import { BranchTypes, Roles } from '@/constants';
import dbConnect from '@/db/dbConnect';
import { AccountModel } from '@/db/models';
import { ComposeUserDTO, CreateUserDTO } from '@/dtos/user/user.dto';
import { ActionResponse } from './types';
import bcrypt from 'bcrypt';
import { sendActivationMail } from './mail';

export const getUserByEmail = async (email?: string | null) => {
  if (!email) return null;

  await dbConnect();
  const user = await AccountModel.findOne({ email });

  if (!user) return null;

  return user.toJSON() as ComposeUserDTO;
};

export const getEmployees = async ({
  isManager,
  branch,
}: {
  isManager: boolean;
  branch?: {
    type?: BranchTypes;
    _id?: string;
  };
}) => {
  const withBranchInfo = branch?._id && branch?.type;

  const filter = {
    role: isManager ? Roles.MANAGER : Roles.STAFF,
    ...(withBranchInfo && {
      branch: {
        type: branch.type,
        [branch.type === BranchTypes.COLLECTION_POINT ? 'collectionPoint' : 'transactionPoint']:
          branch._id,
      },
    }),
  };

  try {
    await dbConnect();
    const query = AccountModel.find(filter);
    const employees = await query.exec();

    return {
      ok: true,
      status: 200,
      message: '',
      data: employees,
    } satisfies ActionResponse;
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: '',
    } satisfies ActionResponse;
  }
};

export const createEmployeeAccount = async (createUserDTO: CreateUserDTO) => {
  if (createUserDTO.role === Roles.ADMIN) return;

  try {
    await dbConnect();

    const emailExists = await AccountModel.exists({
      email: createUserDTO.email,
    });
    if (emailExists)
      return {
        ok: false,
        status: 400,
        message: 'Email đã tồn tại!',
      };

    const password = bcrypt.hashSync('abcd1234', 12);
    const newAccount = await AccountModel.create({
      ...createUserDTO,
      password,
      active: false,
    });

    const resp = await sendActivationMail({
      email: createUserDTO.email,
      role: createUserDTO.role,
      branch: createUserDTO.branch,
    });

    if (!resp.ok) throw new Error(resp.message);

    return {
      ok: true,
      status: 200,
      message: 'Thêm tài khoản thành công!',
      data: newAccount.toJSON(),
    } satisfies ActionResponse;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      status: 500,
      message: 'Có lỗi xảy ra, vui lòng thử lại sau!',
    } satisfies ActionResponse;
  }
};
