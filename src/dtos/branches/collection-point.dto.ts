import { CollectionPoint } from '@/db/models/Branches';

export interface GetCollectionPointDTO
  extends Omit<CollectionPoint, '_id' | 'manager' | 'transactionPoints'> {
  _id: string;
  manager: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  transactionPoints: string[];
}

export interface DisplayCollectionPointDTO extends Pick<CollectionPoint, 'name'> {
  _id: string;
  manager: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  transactionPoints: string[];
}

export interface CreateCollectionPointDTO
  extends Pick<
    CollectionPoint,
    'address' | 'ward' | 'district' | 'province' | 'postalCode' | 'name' | 'createdAt'
  > {}

export interface UpdateCollectionPointDTO
  extends Omit<CollectionPoint, '_id' | 'manager' | 'staffs' | 'transactionPoints'> {}
