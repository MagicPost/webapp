'use server';

import dbConnect from '@/db/dbConnect';
import { AccountModel, CollectionPointModel, TransactionPointModel } from '@/db/models';
import { GetUserDTO } from '@/dtos/user/user.dto';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { catchAsync } from '../_helpers/catchAsync';
import { BranchTypes } from '@/constants';

interface FlattenUser extends Omit<GetUserDTO, 'branch'> {
  branch?: {
    type: BranchTypes;
    ref: string;
  };
}

export const getUserByEmail = catchAsync(
  async ({ email, withBranch = false }: { email: string | null; withBranch?: boolean }) => {
    if (!email) return null;

    await dbConnect();
    let query = AccountModel.findOne({ email });

    let user = await query.lean().exec();

    const flattenUser = transformObjectIdFromLeanedDoc(user) as FlattenUser;

    let branchInfo = null;
    if (withBranch) {
      const branchModel =
        flattenUser?.branch?.type === BranchTypes.COLLECTION_POINT
          ? CollectionPointModel
          : TransactionPointModel;
      branchInfo = await branchModel
        .findOne({ _id: flattenUser?.branch?.ref })
        .select('_id name')
        .lean()
        .exec();
    }

    branchInfo = transformObjectIdFromLeanedDoc(branchInfo);

    return {
      ...flattenUser,
      branch: {
        _id: flattenUser.branch?.ref,
        type: flattenUser.branch?.type,
        ...(branchInfo && { name: branchInfo.name }),
      },
    } satisfies GetUserDTO;
  }
);
