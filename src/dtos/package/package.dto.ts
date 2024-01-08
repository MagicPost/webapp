import { Package } from '@/db/models/Package';
import { z } from 'zod';
import { clientFormSchema, packageFormSchema, serviceFormSchema } from './schema';
import { BranchTypes } from '@/constants';

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

export interface CreatePackageDTO {
  sender: z.infer<typeof clientFormSchema>;
  receiver: z.infer<typeof clientFormSchema>;
  package: z.infer<typeof packageFormSchema>;
  service: z.infer<typeof serviceFormSchema>;
  distance: number;
  postages: {
    main: number;
    plus: number;
  };
  branch: {
    _id: string;
    name: string;
    type: BranchTypes;
    district: string;
    province: string;
  };
}
