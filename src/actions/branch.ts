'use server';

import dbConnect from '@/db/dbConnect';
import { CollectionPointModel, TransactionPointModel } from '@/db/models';
import {
  CreateCollectionPointDTO,
  GetCollectionPointDTO,
} from '@/dtos/branches/collection-point.dto';
import { ActionResponse } from './types';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import {
  CreateTransactionPointDTO,
  GetTransactionPointDTO,
} from '@/dtos/branches/transaction-point.dto';
import { getGeolocation } from '@/lib/geography';

export const getCollectionPoints = async ({
  withTransactionPoints = false,
}: {
  withTransactionPoints?: boolean;
}) => {
  try {
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

    const geolocation = getGeolocation(collectionPointDto.province);
    let collectionPoint = await CollectionPointModel.create({
      ...collectionPointDto,
      geolocation,
    });
    collectionPoint = transformObjectIdFromLeanedDoc(collectionPoint.toObject());

    return {
      ok: true,
      message: 'Tạo điểm tập kết thành công!',
      status: 201,
      data: collectionPoint as GetCollectionPointDTO,
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

export const getTransactionPointsOf = async (collectionPointId: string) => {
  try {
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
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
      status: 500,
    } satisfies ActionResponse;
  }
};

export const createTransactionPoint = async (transactionPointDto: CreateTransactionPointDTO) => {
  try {
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
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
      status: 500,
    } satisfies ActionResponse;
  }
};
