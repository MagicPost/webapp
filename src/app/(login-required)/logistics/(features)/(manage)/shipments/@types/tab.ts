import { GetBatchDTO } from '@/dtos/batch/batch.dto';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import { GetPackageDTO } from '@/dtos/package/package.dto';

export enum ETabValue {
  GONNA_RECEIVE = 'gonna-receive',
  PENDING = 'pending',
  FORWARDING = 'forwarding',
  FORWARDED = 'forwarded',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
  RESENT = 'resent',
}

export type TTab = {
  label: string;
  value: ETabValue;
  total?: number;
  icon: JSX.Element;
  iconContainerClassname?: string;
  produceComponent?: ({
    branch,
  }: {
    branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
  }) => JSX.Element;
};

export type TPackagesMap = {
  [key in Extract<
    ETabValue,
    ETabValue.PENDING | ETabValue.DELIVERING | ETabValue.DELIVERED | ETabValue.RESENT
  >]?: GetPackageDTO[];
};
export type TBatchesMap = {
  [key in Extract<
    ETabValue,
    ETabValue.GONNA_RECEIVE | ETabValue.FORWARDED | ETabValue.FORWARDING
  >]?: GetBatchDTO[];
};
