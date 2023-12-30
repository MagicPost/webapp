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

export enum ContainerStates {
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
