import { BranchTypes } from '@/constants';

export interface GetBasicBranchDTO {
  _id: string;
  type: BranchTypes;
  name: string;
  address: string;
  manager: string;
}
