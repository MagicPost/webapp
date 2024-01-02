import { CollectionPoint } from '@/db/models/Branches';

export interface GetCollectionPointDTO extends Omit<CollectionPoint, '_id'> {
  _id: string;
}

export interface CreateCollectionPointDTO
  extends Omit<
    CollectionPoint,
    '_id' | 'manager' | 'staffs' | 'transactionPoints' | 'geolocation'
  > {}

export interface UpdateCollectionPointDTO
  extends Omit<CollectionPoint, '_id' | 'manager' | 'staffs' | 'transactionPoints'> {}
