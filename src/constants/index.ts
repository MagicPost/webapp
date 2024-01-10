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
  PENDING__READY_TO_DELIVER = 'pending_delivery',
  PENDING__READY_TO_TRANSER = 'pending_transfer',
  IN_TRANSIT = 'in_transit',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
  RESENT = 'resent',
}

export enum PackageTrackingActions {
  CREATED = 'created',
  CANCELLED = 'cancelled',
  ARRIVED = 'arrived',
  DEPARTED = 'departed',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
  RESENT = 'resent',
}

export const PackageTrackingActionsMap = {
  [PackageTrackingActions.CREATED]: 'Đã tạo đơn',
  [PackageTrackingActions.CANCELLED]: 'Đã hủy đơn',
  [PackageTrackingActions.ARRIVED]: 'Đã đến kho',
  [PackageTrackingActions.DEPARTED]: 'Đã rời kho',
  [PackageTrackingActions.DELIVERING]: 'Đang giao hàng',
  [PackageTrackingActions.DELIVERED]: 'Đã giao hàng',
  [PackageTrackingActions.RESENT]: 'Người nhận đã trả hàng',
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
  PENDING = 'pending',
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
