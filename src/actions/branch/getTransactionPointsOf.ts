'use server';

import dbConnect from '@/db/dbConnect';
import { TransactionPointModel } from '@/db/models';
import { ActionResponse } from '../_helpers/types';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { GetTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';
import { catchAsync } from '../_helpers/catchAsync';

export const getTransactionPointsOf = catchAsync(
  async (
    collectionPointId: string,
    {
      include,
    }: {
      include?: {
        manager?: boolean;
      };
    }
  ) => {
    await dbConnect();

    let query = TransactionPointModel.find({
      collectionPoint: collectionPointId,
    });

    if (include?.manager) {
      query = query.populate({
        path: 'manager',
        select: '_id firstName lastName',
      });
    }

    let transactionPoints = await query.lean().exec();
    transactionPoints = transformObjectIdFromLeanedDoc(transactionPoints);

    if (!Array.isArray(transactionPoints)) transactionPoints = [transactionPoints];

    return {
      ok: true,
      message: 'Lấy danh sách điểm giao dịch thành công!',
      status: 200,
      data: transactionPoints as GetTransactionPointDTO[],
    } satisfies ActionResponse;
  }
);
