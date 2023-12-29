'use server';

import dbConnect from '@/db/dbConnect';
import { CollectionPointModel } from '@/db/models';
import {
  CreateCollectionPointDTO,
  GetCollectionPointDTO,
} from '@/dtos/branches/collection-point.dto';
import { ActionResponse } from './types';

export const getCollectionPoints = async ({
  withTransactionPoints = false,
}: {
  withTransactionPoints?: boolean;
}) => {
  try {
    await dbConnect();

    let query = CollectionPointModel.find({});
    if (withTransactionPoints) query.populate('transactionPoints');

    let collectionPoints = await query.exec();

    collectionPoints = collectionPoints.map((item) => ({
      ...item.toJSON(),
      _id: item._id.toString(),
    }));

    return {
      ok: true,
      message: 'Lấy danh sách điểm tập kết thành công!',
      status: 200,
      data: collectionPoints as GetCollectionPointDTO[],
    } satisfies ActionResponse;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
      status: 500,
    } satisfies ActionResponse;
  }
};

export const createCollectionPoint = async (collectionPointDto: CreateCollectionPointDTO) => {
  try {
    await dbConnect();

    const collectionPoint = await CollectionPointModel.create(collectionPointDto);

    console.log(collectionPoint.toJSON());
    return {
      ok: true,
      message: 'Tạo điểm tập kết thành công!',
      status: 200,
      data: collectionPoint.toJSON(),
    } satisfies ActionResponse;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
      status: 500,
    } satisfies ActionResponse;
  }
};
