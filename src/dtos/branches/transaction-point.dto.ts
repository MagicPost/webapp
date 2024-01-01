import { TransactionPoint } from '@/db/models/Branches';

export interface GetTransactionPointDTO extends Omit<TransactionPoint, '_id'> {
  _id: string;
}

export interface CreateTransactionPoint
  extends Omit<TransactionPoint, '_id' | 'manager' | 'staffs' | 'collectionPoint'> {
  collectionPoint: string;
}
