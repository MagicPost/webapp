'use server';

import dbConnect from '@/db/dbConnect';
import { CollectionPointModel, TransactionPointModel } from '@/db/models';
import { ActionResponse } from '../_helpers/types';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import {
  CreateTransactionPointDTO,
  GetTransactionPointDTO,
} from '@/dtos/branches/transaction-point.dto';
import { catchAsync } from '../_helpers/catchAsync';

export const createTransactionPoint = catchAsync(
  async (transactionPointDto: CreateTransactionPointDTO) => {
    await dbConnect();

    let transactionPoint = await TransactionPointModel.create(transactionPointDto);
    transactionPoint = transformObjectIdFromLeanedDoc(transactionPoint.toObject());

    await CollectionPointModel.findOneAndUpdate(
      { _id: transactionPointDto.collectionPoint },
      { $push: { transactionPoints: transactionPoint._id } }
    );

    return {
      ok: true,
      message: 'Tạo điểm giao dịch thành công!',
      status: 201,
      data: transactionPoint as GetTransactionPointDTO,
    } satisfies ActionResponse;
  }
);
