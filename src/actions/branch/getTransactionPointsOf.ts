import dbConnect from '@/db/dbConnect';
import { TransactionPointModel } from '@/db/models';
import { ActionResponse } from '../_helpers/types';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { GetTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';
import { catchAsync } from '../_helpers/catchAsync';

export const getTransactionPointsOf = catchAsync(async (collectionPointId: string) => {
  await dbConnect();

  let transactionPoints = await TransactionPointModel.find({
    collectionPoint: collectionPointId,
  })
    .lean()
    .exec();

  transactionPoints = transformObjectIdFromLeanedDoc(transactionPoints as any);

  if (!Array.isArray(transactionPoints)) transactionPoints = [transactionPoints];

  return {
    ok: true,
    message: 'Lấy danh sách điểm giao dịch thành công!',
    status: 200,
    data: transactionPoints as GetTransactionPointDTO[],
  } satisfies ActionResponse;
});
