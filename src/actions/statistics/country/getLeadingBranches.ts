'use server';

import { catchAsync } from '@/actions/_helpers/catchAsync';
import { ActionResponse } from '@/actions/_helpers/types';
import { BranchTypes } from '@/constants';
import dbConnect from '@/db/dbConnect';
import { BatchModel, CollectionPointModel, PackageModel, TransactionPointModel } from '@/db/models';

type FieldProps = {
  _id: string;
  name: string;
  fullAddress: string;
  count: number;
};

export type LeadingBranches = {
  collectionPoints: FieldProps[];
  transactionPoints: FieldProps[];
};

export const getLeadingBranches = catchAsync(async () => {
  await dbConnect();

  const [collectionPoints, transactionPoints] = await Promise.all([
    getLeadingCollectionPoints(3),
    getLeadingTransactionPoints(5),
  ]);

  return {
    ok: true,
    message: '',
    data: {
      collectionPoints,
      transactionPoints,
    } satisfies LeadingBranches,
  } satisfies ActionResponse;
});

async function getLeadingCollectionPoints(limit: number) {
  const today = new Date();
  const thisMonth = {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: today,
  };

  let collectionPoints = await BatchModel.aggregate()
    .match({
      'to.type': BranchTypes.COLLECTION_POINT,
      createdAt: {
        $gt: thisMonth.start,
        $lte: thisMonth.end,
      },
    })
    .group({
      _id: '$to.ref',
      packageCount: { $sum: { $size: '$packages' } },
    })
    .sort({
      packageCount: -1,
    })
    .limit(limit)
    .lookup({
      from: CollectionPointModel.collection.name,
      let: {
        id: '$_id',
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [
                '$_id',
                {
                  $toObjectId: '$$id',
                },
              ],
            },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            fullAddress: {
              $concat: ['$address', ', ', '$ward', ', ', '$district', ', ', '$province'],
            },
          },
        },
      ],
      as: 'branch',
    })
    .unwind('$branch')
    .project({
      _id: 1,
      name: '$branch.name',
      fullAddress: '$branch.fullAddress',
      count: '$packageCount',
    })
    .exec();

  if (collectionPoints.length < limit) {
    const addedCollectionPoints = await CollectionPointModel.aggregate()
      .match({
        _id: {
          $nin: collectionPoints.map((cp) => cp._id),
        },
      })
      .project({
        _id: 1,
        name: 1,
        fullAddress: {
          $concat: ['$address', ', ', '$ward', ', ', '$district', ', ', '$province'],
        },
        count: { $literal: 0 },
      })
      .limit(limit - collectionPoints.length)
      .exec();

    collectionPoints = collectionPoints.concat(addedCollectionPoints);
  }

  return collectionPoints;
}

async function getLeadingTransactionPoints(limit: number) {
  const today = new Date();
  const thisMonth = {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: today,
  };

  let transactionPoints = await PackageModel.aggregate()
    .match({
      createdAt: {
        $gt: thisMonth.start,
        $lte: thisMonth.end,
      },
    })
    .group({
      _id: '$sentAt',
      count: { $sum: 1 },
    })
    .sort({
      count: -1,
    })
    .limit(limit)
    .lookup({
      from: TransactionPointModel.collection.name,
      localField: '_id',
      foreignField: '_id',
      as: 'branch',
    })
    .unwind('$branch')
    .project({
      _id: 1,
      name: '$branch.name',
      fullAddress: {
        $concat: [
          '$branch.address',
          ', ',
          '$branch.ward',
          ', ',
          '$branch.district',
          ', ',
          '$branch.province',
        ],
      },
      count: 1,
    })
    .exec();

  if (transactionPoints.length < limit) {
    const addedTransactionPoints = await TransactionPointModel.aggregate()
      .match({
        _id: {
          $nin: transactionPoints.map((tp) => tp._id),
        },
      })
      .project({
        _id: 1,
        name: 1,
        fullAddress: {
          $concat: ['$address', ', ', '$ward', ', ', '$district', ', ', '$province'],
        },
        count: { $literal: 0 },
      })
      .limit(limit - transactionPoints.length)
      .exec();

    transactionPoints = transactionPoints.concat(addedTransactionPoints);
  }

  return transactionPoints;
}
