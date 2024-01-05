import { Batch } from '@/db/models/Batch';

export interface GetBatchDTO extends Omit<Batch, '_id' | 'createdAt' | 'updatedAt'> {
  _id: string;
  createdAt: string;
}
