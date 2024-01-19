'use server';

import dbConnect from '@/db/dbConnect';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';
import { PackageStates, PackageTrackingActions } from '@/constants';
import { PackageModel } from '@/db/models';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';

export const addPackageTrackingAction = catchAsync(
  async ({
    _id,
    branchId,
    actionType,
  }: {
    _id: string;
    branchId: string;
    actionType: PackageTrackingActions;
  }) => {
    await dbConnect();

    let updatedPackage = await PackageModel.findByIdAndUpdate(
      _id,
      {
        $push: {
          'tracking.$[elem].actions': {
            type: actionType,
            createdAt: new Date(),
          },
        },
      },
      {
        arrayFilters: [
          {
            'elem.branch.ref': branchId,
          },
        ],
        new: true,
      }
    )
      .lean()
      .exec();
    updatedPackage = transformObjectIdFromLeanedDoc(updatedPackage) as GetPackageDTO;

    let packageState = {
      [PackageTrackingActions.CREATED]: null,
      [PackageTrackingActions.CANCELLED]: null,
      [PackageTrackingActions.ARRIVED]:
        updatedPackage?.receivedAt! === branchId
          ? PackageStates.PENDING__READY_TO_DELIVER
          : PackageStates.PENDING__READY_TO_TRANSER,
      [PackageTrackingActions.DEPARTED]: PackageStates.IN_TRANSIT,
      [PackageTrackingActions.DELIVERING]: PackageStates.DELIVERING,
      [PackageTrackingActions.DELIVERED]: PackageStates.DELIVERED,
      [PackageTrackingActions.RESENT]: PackageStates.RESENT,
    }[actionType];

    if (packageState) {
      updatedPackage = await PackageModel.findByIdAndUpdate(
        _id,
        {
          $set: {
            state: packageState,
          },
        },
        {
          new: true,
        }
      )
        .lean()
        .exec();
      updatedPackage = transformObjectIdFromLeanedDoc(updatedPackage) as GetPackageDTO;
    }

    return {
      ok: true,
      message: '',
      data: updatedPackage,
    } satisfies ActionResponse;
  }
);
