import dbConnect from '@/db/dbConnect';
import { PackageModel } from '@/db/models';
import { GetOrderDto } from '@/dtos/order/order.dto';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';

export const getOrder = catchAsync(async () => {
  await dbConnect();

  let order = await PackageModel.find({}).lean().exec();

  order = transformObjectIdFromLeanedDoc(order as any);

  return {
    ok: true,
    message: 'Lấy đơn hàng thành công!',
    status: 200,
    data: order as GetOrderDto[],
  } satisfies ActionResponse;
});
