'use server';

import dbConnect from '@/db/dbConnect';
import { catchAsync } from '../_helpers/catchAsync';
import { GetCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { CollectionPointModel, TransactionPointModel } from '@/db/models';
import { ActionResponse } from '../_helpers/types';
import { GetTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';

export const updateCollectionPoint = catchAsync(
  async (_id: string, payload: Partial<GetCollectionPointDTO>) => {
    await dbConnect();

    await CollectionPointModel.findOneAndUpdate({ _id }, payload, {
      new: true,
      runValidators: true,
    });

    return {
      ok: true,
      message: 'Cập nhật thành công',
    } satisfies ActionResponse;
  }
);

export const updateTransactionPoint = catchAsync(
  async (_id: string, payload: Partial<GetTransactionPointDTO>) => {
    await dbConnect();
    await TransactionPointModel.findOneAndUpdate({ _id }, payload, {
      new: true,
      runValidators: true,
    });

    return {
      ok: true,
      message: 'Cập nhật thành công',
    } satisfies ActionResponse;
  }
);
