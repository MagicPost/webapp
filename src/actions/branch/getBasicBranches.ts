import dbConnect from '@/db/dbConnect';
import { CollectionPointModel, TransactionPointModel } from '@/db/models';
import { DisplayCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { ActionResponse } from '../_helpers/types';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { DisplayTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';
import { catchAsync } from '../_helpers/catchAsync';

export const getBasicBranches = catchAsync(
  async ({ withTransactionPoints = false, withCollectionPoints = false }) => {
    if (!withTransactionPoints && !withCollectionPoints) {
      return {
        ok: false,
        message: 'Vui lòng chọn ít nhất một loại!',
        status: 400,
      } satisfies ActionResponse;
    }

    await dbConnect();

    let collectionPoints = [];
    if (withCollectionPoints) {
      collectionPoints = await CollectionPointModel.find({})
        .select('_id name transactionPoints')
        .lean()
        .exec();
      collectionPoints = collectionPoints.map((item) => transformObjectIdFromLeanedDoc(item));
    }

    let transactionPoints = [];
    if (withTransactionPoints) {
      transactionPoints = await TransactionPointModel.find({})
        .select('_id name collectionPoint')
        .lean()
        .exec();
      transactionPoints = transactionPoints.map((item) => transformObjectIdFromLeanedDoc(item));
    }

    return {
      ok: true,
      message: 'Lấy danh sách chi nhánh thành công!',
      status: 200,
      data: {
        collectionPoints: (collectionPoints || []) as DisplayCollectionPointDTO[],
        transactionPoints: (transactionPoints || []) as DisplayTransactionPointDTO[],
      },
    } satisfies ActionResponse;
  }
);
