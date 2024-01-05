import { Package } from '@/db/models/Package';

export interface GetPackageDTO extends Omit<Package, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}
