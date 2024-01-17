'use server';

import { catchAsync } from '@/actions/_helpers/catchAsync';
import { ActionResponse } from '@/actions/_helpers/types';
import { PackageTrackingActions } from '@/constants';
import dbConnect from '@/db/dbConnect';
import { BatchModel, PackageModel } from '@/db/models';

export type TransactionPointStatsByWeek = {
  receivedPackages: number;
  sentPackages: number;
  deliveredPackages: number;
  resentPackages: number;
};

export const getTransactionStatsOfWeek = catchAsync(async (branchId: string) => {
  await dbConnect();
  const lastWeek = getSevenDays();

  const [receivedPackages, sentPackages, deliveredPackages, resentPackages] = await Promise.all([
    countReceivedPackages(branchId, lastWeek),
    countSentPackages(branchId, lastWeek),
    countDeliveredPackages(branchId, lastWeek),
    countResentPackages(branchId, lastWeek),
  ]);

  return {
    ok: true,
    message: '',
    data: {
      receivedPackages,
      sentPackages,
      deliveredPackages,
      resentPackages,
    } satisfies TransactionPointStatsByWeek,
  } satisfies ActionResponse;
});

function getSevenDays() {
  const today = new Date();
  return {
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
    end: today,
  };
}

async function countReceivedPackages(
  branchId: string,
  timerange: {
    start: Date;
    end: Date;
  }
) {
  const packages = await BatchModel.aggregate([
    {
      $match: {
        'to.ref': branchId,
        createdAt: {
          $gt: timerange.start.toISOString(),
          $lt: timerange.end.toISOString(),
        },
      },
    },
    {
      $project: {
        count: {
          $size: '$packages',
        },
      },
    },
  ]).exec();
  return packages.reduce((acc, curr) => acc + curr.count, 0);
}

function countSentPackages(branchId: string, timerange: { start: Date; end: Date }) {
  return PackageModel.find({
    sentAt: branchId,
    createdAt: { $gte: timerange.start, $lte: timerange.end },
  }).countDocuments();
}

function countDeliveredPackages(branchId: string, timerange: { start: Date; end: Date }) {
  return PackageModel.find({
    receivedAt: branchId,
    tracking: {
      $elemMatch: {
        actions: {
          $elemMatch: {
            type: PackageTrackingActions.DELIVERED,
            createdAt: { $gte: timerange.start, $lte: timerange.end },
          },
        },
      },
    },
  }).countDocuments();
}

function countResentPackages(branchId: string, timerange: { start: Date; end: Date }) {
  return PackageModel.find({
    receivedAt: branchId,
    tracking: {
      $elemMatch: {
        actions: {
          $elemMatch: {
            type: PackageTrackingActions.RESENT,
            createdAt: { $gte: timerange.start, $lte: timerange.end },
          },
        },
      },
    },
  }).countDocuments();
}
