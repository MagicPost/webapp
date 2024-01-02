import { TransactionPoint } from '@/db/models/Branches';

export interface GetTransactionPointDTO extends Omit<TransactionPoint, '_id' | 'collectionPoint'> {
  _id: string;
  collectionPoint: string;
}

export interface DisplayTransactionPointDTO {
  _id: string;
  name: string;
  collectionPoint: string;
}

export interface CreateTransactionPointDTO
  extends Omit<TransactionPoint, '_id' | 'manager' | 'staffs' | 'collectionPoint'> {
  collectionPoint: string;
}
