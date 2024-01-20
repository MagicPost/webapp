'use server';

import { catchAsync } from '@/actions/_helpers/catchAsync';
import { getGrowRate } from '@/actions/_helpers/rate';
import { getLastMonth, getThisMonth } from '@/actions/_helpers/time';
import { ActionResponse } from '@/actions/_helpers/types';
import { PackageStates } from '@/constants';
import dbConnect from '@/db/dbConnect';
import { PackageModel } from '@/db/models';

type FieldProps = {
  newest: number;
  growthRate: number;
};

export type CountryPackageStats = {
  sentPackages: FieldProps;
  postages: FieldProps;
  resentPackages: FieldProps;
};

export const getCountryPackageStats = catchAsync(async () => {
  await dbConnect();

  const [sentPackages, postages, resentPackages] = await Promise.all([
    countSentPackages(),
    calculatePostages(),
    countResentPackages(),
  ]);

  return {
    ok: true,
    message: '',
    data: {
      sentPackages,
      postages,
      resentPackages,
    } satisfies CountryPackageStats,
  } satisfies ActionResponse;
});

/* =========================== */

async function countSentPackages() {
  const [packageCountThisMonth, packageCountLastMonth] = await Promise.all([
    countSentPackagesByMonth(getThisMonth()),
    countSentPackagesByMonth(getLastMonth()),
  ]);

  return {
    newest: packageCountThisMonth,
    growthRate: getGrowRate(packageCountThisMonth, packageCountLastMonth),
  } satisfies FieldProps;
}

function countSentPackagesByMonth(month: { start: Date; end: Date }) {
  return PackageModel.find({
    createdAt: {
      $gt: month.start.toISOString(),
      $lt: month.end.toISOString(),
    },
  }).countDocuments();
}

/* =========================== */

async function countResentPackages() {
  const [resentPackagesThisMonth, resentPackagesLastMonth] = await Promise.all([
    countResentPackagesByMonth(getThisMonth()),
    countResentPackagesByMonth(getLastMonth()),
  ]);

  return {
    newest: resentPackagesThisMonth,
    growthRate: getGrowRate(resentPackagesThisMonth, resentPackagesLastMonth),
  } satisfies FieldProps;
}

function countResentPackagesByMonth(month: { start: Date; end: Date }) {
  return PackageModel.find({
    status: PackageStates.RESENT,
    updatedAt: {
      $gt: month.start.toISOString(),
      $lt: month.end.toISOString(),
    },
  }).countDocuments();
}

/* =========================== */
async function calculatePostages() {
  const [postagesThisMonth, postagesLastMonth] = await Promise.all([
    calculatePostagesByMonth(getThisMonth()),
    calculatePostagesByMonth(getLastMonth()),
  ]);

  return {
    newest: postagesThisMonth,
    growthRate: getGrowRate(postagesThisMonth, postagesLastMonth),
  } satisfies FieldProps;
}

async function calculatePostagesByMonth(month: { start: Date; end: Date }) {
  const postages = await PackageModel.find({
    createdAt: {
      $gt: month.start.toISOString(),
      $lt: month.end.toISOString(),
    },
  }).select('postages');
  return postages.reduce((acc, curr) => acc + curr.postages.main + curr.postages.plus, 0);
}
