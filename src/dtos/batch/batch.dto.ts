import { Batch } from '@/db/models/Batch';
import { GetPackageDTO } from '../package/package.dto';

export interface GetBatchDTO extends Pick<Batch, 'from' | 'to' | 'truckId' | 'state'> {
  _id: string;
  createdAt: string;
  sentTime?: string;
  receivedTime?: string;
  packages: Pick<GetPackageDTO, '_id'>[];
}
