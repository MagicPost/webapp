import { GetBatchDTO } from '@/dtos/batch/batch.dto';
import { GetPackageDTO } from '@/dtos/package/package.dto';

export enum ETabValue {
  GONNA_RECEIVE = 'gonna-receive',
  PENDING_PACKAGE = 'pending-package',
  PENDING_BATCH = 'pending-batch',
  FORWARDING = 'forwarding',
  FORWARDED = 'forwarded',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
  RESENT = 'resent',
}

export type TTab = {
  entity: 'batch' | 'package';
  label: string;
  value: ETabValue;
  total?: number;
  icon: JSX.Element;
  iconContainerClassname?: string;
  produceComponent?: (props: any) => JSX.Element;
};

export type TPackagesMap = {
  [key in Extract<
    ETabValue,
    ETabValue.PENDING_PACKAGE | ETabValue.DELIVERING | ETabValue.DELIVERED | ETabValue.RESENT
  >]?: GetPackageDTO[];
};
export type TBatchesMap = {
  [key in Extract<
    ETabValue,
    ETabValue.GONNA_RECEIVE | ETabValue.FORWARDED | ETabValue.FORWARDING | ETabValue.PENDING_BATCH
  >]?: GetBatchDTO[];
};
