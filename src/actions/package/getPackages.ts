'use server';

import { PackageModel } from '@/db/models';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import dbConnect from '@/db/dbConnect';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';

const getPackages = catchAsync(
  async ({
    filter,
    include,
  }: {
    filter: any;
    include?: {
      sentAt?: boolean;
      receivedAt?: boolean;
    };
  }) => {
    await dbConnect();

    let query = PackageModel.find(filter);

    if (include?.sentAt) {
      query = query.populate({
        path: 'sentAt',
        select: '+postalCode name address district province',
      });
    }

    if (include?.receivedAt) {
      query = query.populate({
        path: 'receivedAt',
        select: 'postalCode name address district province ward',
      });
    }

    let packages = await query.lean().exec();
    packages = transformObjectIdFromLeanedDoc(packages);
    return {
      ok: true,
      message: '',
      data: packages,
      status: 200,
    } satisfies ActionResponse;
  }
);

export const getAllPackagesOfBranch = catchAsync(
  async ({ branch }: { branch: Omit<GetBasicBranchDTO, 'address' | 'manager'> }) => {
    await dbConnect();
    let packages = await PackageModel.find({
      tracking: {
        $elemMatch: {
          'branch.type': branch.type,
          'branch.ref': branch._id,
          actions: { $exists: true, $not: { $size: 0 } },
        },
      },
    })
      .lean()
      .exec();

    packages = transformObjectIdFromLeanedDoc(packages);

    packages = packages.filter((pkg) => {
      let lastNonEmptyActions = pkg.tracking.findLast((log: any) => log.actions.length > 0);
      return (
        lastNonEmptyActions.branch.type === branch.type &&
        lastNonEmptyActions.branch.ref === branch._id
      );
    });

    return {
      ok: true,
      message: '',
      data: packages,
    } satisfies ActionResponse;
  }
);

export const getPackagesByIds = catchAsync(async (_ids: string[]) => {
  return await getPackages({
    filter: {
      _id: { $in: _ids },
    },
    include: {
      sentAt: true,
      receivedAt: true,
    },
  });
});
