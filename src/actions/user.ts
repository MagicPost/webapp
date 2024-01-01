'use server';

import { BranchTypes, Roles } from '@/constants';
import dbConnect from '@/db/dbConnect';
import { AccountModel } from '@/db/models';
import { ComposeUserDTO, CreateUserDTO, toComposeUserDTO } from '@/dtos/user/user.dto';
import { ActionResponse } from './types';
import bcrypt from 'bcrypt';
import { sendActivationMail } from './mail';
import { AES, enc } from 'crypto-js';
import { Account } from '@/db/models/Account';

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
    let employees = await query.lean().exec();

    employees = employees.map((employee) => {
      const temp = toComposeUserDTO(employee as Account);
      return temp;
    });
    console.log(employees);

    return {
      ok: true,
      status: 200,
      message: '',
      // data: employees as ComposeUserDTO[],
      data: [],
    } satisfies ActionResponse;
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: '',
    } satisfies ActionResponse;
  }
};

const DEFAULT_PASSWORD = 'abcd1234';

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

    const password = bcrypt.hashSync(DEFAULT_PASSWORD, 12);
    const branch = {
      type: createUserDTO.branch.type,
      [createUserDTO.branch.type === BranchTypes.COLLECTION_POINT
        ? 'collectionPoint'
        : 'transactionPoint']: createUserDTO.branch._id,
    };
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

export const updateEmployeeAccount = async (composeUserDTO: ComposeUserDTO) => {
  try {
    await dbConnect();

    const { _id, ...rest } = composeUserDTO;
    const updatedAccount = await AccountModel.findByIdAndUpdate(_id, { ...rest }, { new: true });

    return {
      ok: true,
      status: 200,
      message: 'Cập nhật tài khoản thành công!',
      data: updatedAccount?.toJSON(),
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

export const updateEmployeePassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  try {
    await dbConnect();

    const decrypted = AES.decrypt(token, process.env.PRIVATE_KEY!);
    if (!decrypted) throw new Error('Token không hợp lệ!');

    const { _id } = JSON.parse(decrypted.toString(enc.Utf8));

    const encryptedPassword = bcrypt.hashSync(password, 12);

    const updatedAccount = await AccountModel.findByIdAndUpdate(
      _id,
      { password: encryptedPassword },
      { new: true }
    );

    return {
      ok: true,
      status: 200,
      message: 'Cập nhật mật khẩu thành công!',
      data: updatedAccount?.toJSON(),
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
