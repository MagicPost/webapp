import type { Ref } from '@typegoose/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { TransactionPoint } from './Branches';
import {
  Payer,
  PackageStates,
  PackageTypes,
  PackageTrackingActions,
  BranchTypes,
  TransitServiceTypes,
  PickupTime,
} from '@/constants';
import { getRandomIdWithPrefix } from '@/lib/random';
import { Account } from './Account';

@modelOptions({
  schemaOptions: { versionKey: false, timestamps: false, _id: false },
  options: {
    allowMixed: 0,
  },
})
export class Client {
  @prop({ required: true })
  public fullname!: string;

  @prop({ required: true })
  public address!: string;

  @prop({ required: true })
  public phone!: string;

  @prop({ required: false })
  public email?: string;
}

@modelOptions({
  schemaOptions: { versionKey: false, timestamps: false, _id: false },
  options: {
    allowMixed: 0,
  },
})
export class BranchInfo {
  @prop({ required: true, enum: BranchTypes, type: () => String })
  public type: BranchTypes;

  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public ref: string;
}

@modelOptions({
  schemaOptions: { versionKey: false, timestamps: false, _id: false },
  options: {
    allowMixed: 0,
  },
})
class Log {
  @prop({ required: true, type: () => BranchInfo, _id: false })
  public branch: BranchInfo;

  @prop({ required: true })
  public actions: Action[];
}

@modelOptions({
  schemaOptions: { versionKey: false, timestamps: true, _id: false },
  options: {
    allowMixed: 0,
  },
})
class Action extends TimeStamps {
  @prop({ required: true, enum: PackageTrackingActions, type: () => String })
  public type: PackageTrackingActions;
}

@modelOptions({
  schemaOptions: { versionKey: false, timestamps: false, _id: false },
  options: {
    allowMixed: 0,
  },
})
class Postages {
  @prop({ required: true, enum: Payer, type: () => String })
  public payer: Payer;

  @prop({ required: true, default: 0 })
  public main: number;

  @prop({ required: true, default: 0 })
  public plus: number;
}

@modelOptions({
  schemaOptions: { versionKey: false, timestamps: false, _id: false },
  options: {
    allowMixed: 0,
  },
})
class Services {
  @prop({ required: true, enum: TransitServiceTypes, type: () => String })
  public transit: TransitServiceTypes;

  @prop({ required: false, default: '' })
  public note: string;

  @prop({ required: true, default: 0 })
  public COD: number;

  @prop({ required: true, enum: Payer, type: () => String, default: Payer.SENDER })
  public payer: Payer;

  @prop({ required: true, enum: PickupTime, type: () => String, default: PickupTime.ALL_DAY })
  public pickupTime: PickupTime;
}

@modelOptions({
  schemaOptions: { collection: 'package', versionKey: false, timestamps: true, _id: false },
  options: {
    allowMixed: 0,
  },
})
export class Package extends TimeStamps {
  @prop({ required: true, default: () => getRandomIdWithPrefix('MP-') })
  public _id: string;

  @prop({ required: true, enum: PackageTypes, type: () => String })
  public type!: PackageTypes;

  @prop({ required: true, ref: () => Account })
  public creator!: Ref<Account>;

  @prop({ required: true, ref: () => TransactionPoint })
  public sentAt!: Ref<TransactionPoint>;

  @prop({ required: true, ref: () => TransactionPoint })
  public receivedAt!: Ref<TransactionPoint>;

  @prop({ required: false })
  public distance?: number;

  @prop({ required: true, type: () => Client, _id: false })
  public sender!: Client;

  @prop({ required: true, type: () => Client, _id: false })
  public receiver!: Client;

  @prop({ required: true, type: () => Postages, _id: false })
  public postages: Postages;

  @prop({ required: true, type: () => Services, _id: false })
  public services: Services;

  @prop({ required: true })
  public items: [
    {
      name: string;
      quantity: number;
      weight: number;
      value: number;
    },
  ];

  @prop({
    required: true,
    enum: PackageStates,
    default: PackageStates.PENDING__READY_TO_TRANSER,
    type: () => String,
  })
  public state: PackageStates;

  @prop({
    required: true,
    type: () => [Log],
    _id: false,
  })
  public tracking!: Log[];
}
