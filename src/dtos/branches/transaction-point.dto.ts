import { TransactionPoint } from '@/db/models/Branches';

export interface GetTransactionPointDTO
  extends Omit<TransactionPoint, '_id' | 'manager' | 'collectionPoint'> {
  _id: string;
  collectionPoint: string;
  manager: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export interface DisplayTransactionPointDTO extends Pick<TransactionPoint, 'name'> {
  _id: string;
  manager: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  collectionPoint: string;
}

export interface CreateTransactionPointDTO
  extends Omit<TransactionPoint, '_id' | 'manager' | 'staffs' | 'collectionPoint'> {
  collectionPoint: string;
}
