import { Account } from '@/db/models/Account';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { GetBasicBranchDTO } from '../branches/branch.dto';

export interface GetUserDTO extends Omit<Account, '_id' | 'password' | 'branch'> {
  _id: string;
  branch?: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
}

export interface CreateUserDTO extends Omit<Account, '_id' | 'password' | 'active' | 'branch'> {
  branch: Omit<GetBasicBranchDTO, 'name' | 'address' | 'manager'>;
}

export const transformIntoGetUserDTO = (account: Account) => {
  const { branch, ...rest } = transformObjectIdFromLeanedDoc(account);

  return {
    ...(branch && {
      branch: {
        _id: String(branch?.ref),
        type: branch?.type,
      },
    }),
    ...rest,
  } satisfies GetUserDTO;
};
