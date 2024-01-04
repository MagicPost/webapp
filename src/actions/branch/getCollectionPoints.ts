import dbConnect from '@/db/dbConnect';
import { CollectionPointModel } from '@/db/models';
import { GetCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { ActionResponse } from '../_helpers/types';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { catchAsync } from '../_helpers/catchAsync';

export const getCollectionPoints = catchAsync(
  async ({ withTransactionPoints = false }: { withTransactionPoints?: boolean }) => {
    await dbConnect();

    let query = CollectionPointModel.find({});
    if (withTransactionPoints) query.populate('transactionPoints');

    let collectionPoints = await query.lean().exec();
    collectionPoints = collectionPoints.map((item) => transformObjectIdFromLeanedDoc(item));

    return {
      ok: true,
      message: 'Lấy danh sách điểm tập kết thành công!',
      status: 200,
      data: collectionPoints as GetCollectionPointDTO[],
    } satisfies ActionResponse;
  }
);
