'use server';

import dbConnect from '@/db/dbConnect';
import { catchAsync } from '../_helpers/catchAsync';
import { AccountModel } from '@/db/models';
import { ActionResponse } from '../_helpers/types';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { BranchTypes } from '@/constants';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';

interface FlattenBranch {
  type: BranchTypes;
  collectionPoint?: {
    _id: string;
    name: string;
  };
  transactionPoint?: {
    _id: string;
    name: string;
  };
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

    const query = AccountModel.findOne(filter)
      .populate({
        path: 'branch.collectionPoint',
        select,
      })
      .populate({
        path: 'branch.transactionPoint',
        select,
      })
      .select('branch');

    let userInfo = await query.lean().exec();

    const flattenBranch = transformObjectIdFromLeanedDoc(userInfo).branch as FlattenBranch;

    const branchInfo =
      flattenBranch?.type === BranchTypes.COLLECTION_POINT
        ? flattenBranch?.collectionPoint
        : flattenBranch?.transactionPoint;

    return {
      ok: true,
      message: '',
      data: {
        type: flattenBranch.type,
        ...branchInfo!,
      } satisfies Omit<GetBasicBranchDTO, 'address' | 'manager'>,
    } satisfies ActionResponse;
  }
);
