import { Package } from '@/db/models/Package';

export type GetOrderDto = Package;

export type CreateOrderDto = Omit<
    Package,
    '_id' | 'updatedAt' | 'receivedAt' | 'sentAt' | 'creator'
>;
