import { BranchTypes } from '@/constants';
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

  const branchId =
    branch?.type === BranchTypes.COLLECTION_POINT
      ? branch?.collectionPoint
      : branch?.transactionPoint;

  return {
    ...(branch?.type &&
      branchId && {
        branch: {
          _id: String(branchId),
          type: branch?.type,
        },
      }),
    ...rest,
  } satisfies GetUserDTO;
};
