import { BranchTypes } from '@/constants';
import { Account } from '@/db/models/Account';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';

export interface CreateUserDTO extends Omit<Account, '_id' | 'password' | 'active' | 'branch'> {
  branch: {
    _id: string;
    type: string;
    name: string;
    address: string;
  };
}

export interface ComposeUserDTO extends Omit<Account, '_id' | 'password' | 'branch'> {
  _id: string;
  branch?: {
    _id: string;
    type: string;
    name?: string;
  };
}

export const toComposeUserDTO = (account: Account) => {
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
  } satisfies ComposeUserDTO;
};
