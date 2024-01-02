'use server';

import dbConnect from '@/db/dbConnect';
import { CollectionPointModel } from '@/db/models';
import {
  CreateCollectionPointDTO,
  GetCollectionPointDTO,
} from '@/dtos/branches/collection-point.dto';
import { ActionResponse } from '../_helpers/types';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { getGeolocation } from '@/lib/geography';
import { catchAsync } from '../_helpers/catchAsync';

export const createCollectionPoint = catchAsync(
  async (collectionPointDto: CreateCollectionPointDTO) => {
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
  }
);
