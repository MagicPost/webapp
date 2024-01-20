'use server';

import dbConnect from '@/db/dbConnect';
import { catchAsync } from '../_helpers/catchAsync';
import { AccountModel, CollectionPointModel, TransactionPointModel } from '@/db/models';
import { ActionResponse } from '../_helpers/types';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { BranchTypes } from '@/constants';

interface FlattenBranch {
  _id: string;
  name: string;
}

export const getBranchOf = catchAsync(
  async ({
    user,
    customSelect,
  }: {
    user: {
      _id?: string;
      email?: string;
    };
    customSelect?: string;
  }) => {
    await dbConnect();

    if (!user || (!user?.email && !user?._id))
      return {
        ok: false,
        message: 'Bad request',
        status: 400,
      } satisfies ActionResponse;

    const filter = {
      ...(user.email && { email: user.email }),
      ...(user._id && { _id: user._id }),
    };

    const select = customSelect || '_id name';

    const userInfo = (await AccountModel.findOne(filter).select('branch').lean().exec()) as {
      branch?: {
        type: BranchTypes;
        ref: string;
      };
    };

    const branchModel =
      userInfo?.branch?.type === BranchTypes.COLLECTION_POINT
        ? CollectionPointModel
        : TransactionPointModel;
    const branch = await branchModel
      .findOne({ _id: userInfo?.branch?.ref })
      .select(select)
      .lean()
      .exec();

    const flattenBranch = transformObjectIdFromLeanedDoc(branch) as FlattenBranch;

    return {
      ok: true,
      message: '',
      data: {
        type: userInfo?.branch?.type,
        ...flattenBranch,
      },
    } satisfies ActionResponse;
  }
);
