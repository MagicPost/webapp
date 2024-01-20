'use server';

import dbConnect from '@/db/dbConnect';
import { catchAsync } from '../_helpers/catchAsync';
import { CollectionPointModel, TransactionPointModel } from '@/db/models';
import { ActionResponse } from '../_helpers/types';

export const getCollectionPoint = catchAsync(async () => {
  await dbConnect();

  const data1 = await CollectionPointModel.findOne({
    province: 'Thành phố Hà Nội',
  }).exec();

  const data2 = await CollectionPointModel.findById('659f65265213cf79ffc6bf33').exec();

  const data3 = await CollectionPointModel.find({
    province: 'Thành phố Hà Nội',
  })
    .limit(1)
    .exec();

  const data4 = await CollectionPointModel.find({}).limit(3).lean().exec();

  const data5 = await TransactionPointModel.findOne({
    province: 'Thành phố Hà Nội',
  })
    .lean()
    .exec();

  return {
    ok: true,
    data: {
      data1: data1?.toObject(),
      data2: data2?.toObject(),
      data3: data3.map((doc) => doc?.toObject()),
      data4,
      data5,
    },
    message: '',
  } satisfies ActionResponse;
});
