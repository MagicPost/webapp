export enum Areas {
  ADMIN = 'admin',
  LOGISTICS = 'logistics',
}

export enum Roles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
}

export enum BranchTypes {
  TRANSACTION_POINT = 'transaction_point',
  COLLECTION_POINT = 'collection_point',
}

export enum PackageStates {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
}

export enum PackageTrackingActions {
  CREATED = 'created',
  CANCELLED = 'cancelled',
  ARRIVED = 'arrived',
  DEPARTED = 'departed',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
}

export const PackageTrackingActionsMap = {
  [PackageTrackingActions.CREATED]: 'Đã tạo đơn',
  [PackageTrackingActions.CANCELLED]: 'Đã hủy đơn',
  [PackageTrackingActions.ARRIVED]: 'Đã đến kho',
  [PackageTrackingActions.DEPARTED]: 'Đã rời kho',
  [PackageTrackingActions.DELIVERING]: 'Đang giao hàng',
  [PackageTrackingActions.DELIVERED]: 'Đã giao hàng',
  [PackageTrackingActions.RETURNED]: 'Người nhận đã trả hàng',
};

export enum PackageTypes {
  DOCUMENT = 'document',
  PARCEL = 'parcel',
}

export enum TransitServiceTypes {
  ECONOMICAL = 'economical',
  STANDARD = 'standard',
  EXPRESS = 'express',
}

export enum PlusServiceTypes {
  INSURANCE = 'insurance',
  REFUND = 'refund',
}

export enum SpecialProperties {
  HIGHVALUE = 'high_value',
  FRAGILE = 'fragile',
  LIQUID = 'liquid',
  PERISHABLE = 'perishable',
  BULKY = 'bulky',
}

export enum BatchStates {
  IN_TRANSIT = 'in_transit',
  ARRIVED = 'arrived',
}

export enum Payer {
  SENDER = 'sender',
  RECEIVER = 'receiver',
}

export enum PickupTime {
  ALL_DAY = 'all_day',
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  TIME_IN_WORKS = 'time_in_works',
  SUNDAY = 'sunday',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
