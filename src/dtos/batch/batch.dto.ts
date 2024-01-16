import { Batch } from '@/db/models/Batch';
import { GetPackageDTO } from '../package/package.dto';

export interface GetBatchDTO extends Pick<Batch, '_id' | 'from' | 'to' | 'truckCode' | 'state'> {
  createdAt: string;
  sentTime?: string;
  receivedTime?: string;
  packages: GetPackageDTO['_id'][];
}

export interface CreateBatchDTO extends Pick<Batch, 'from' | 'to' | 'truckCode' | 'state'> {
  packages: GetPackageDTO['_id'][];
}
