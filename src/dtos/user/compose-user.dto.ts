import { Account } from '@/db/models/Account';

export interface ComposeUserDTO extends Omit<Account, '_id' | 'password' | 'branch'> {
  _id: string;
  branch?: {
    _id: string;
    type: string;
    name?: string;
  };
}

export const toComposeUserDTO = (account: Account) => {
  const { _id, branch, ...rest } = account;
  return {
    _id: String(_id),
    // branch: {
    //   _id: String(branch?.collectionPoint),
    //   type: branch?.type!,
    // },
    ...rest,
  } satisfies ComposeUserDTO;
};
