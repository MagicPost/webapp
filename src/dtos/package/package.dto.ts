import { Package } from '@/db/models/Package';

export interface GetPackageDetailsDTO
  extends Omit<Package, 'createdAt' | 'updatedAt' | 'sentAt' | 'receivedAt'> {
  createdAt: string;
  updatedAt: string;
  sentAt: {
    _id: string;
    name: string;
  };
  receivedAt: {
    _id: string;
    name: string;
  };
}

export interface GetPackageDTO extends Omit<Package, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export interface CreatePackageDTO extends Omit<Package, '_id' | 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}
