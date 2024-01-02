'use server';

import dbConnect from '@/db/dbConnect';
import { AccountModel } from '@/db/models';
import { GetUserDTO } from '@/dtos/user/user.dto';

export const getUserByEmail = async (email?: string | null) => {
  if (!email) return null;

  await dbConnect();
  const user = await AccountModel.findOne({ email });

  if (!user) return null;

  return user.toJSON() as GetUserDTO;
};
