export enum Areas {
  ADMIN = 'admin',
  LOGISTICS = 'logistics',
}

export enum Roles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

export enum BranchTypes {
  TRANSACTION_POINT = 'transaction_point',
  COLLECTION_POINT = 'collection_point',
}

export enum ShipmentStates {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
}

export enum Payer {
  SENDER = 'sender',
  RECEIVER = 'receiver',
}
