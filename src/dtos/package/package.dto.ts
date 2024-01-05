import { Package } from '@/db/models/Package';

export interface GetPackageDTO extends Omit<Package, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export interface CreatePackageDTO extends Omit<Package, '_id' | 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}
