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
} from '@/constants';
import { getRandomBase64Id } from '@/lib/random';
import { Account } from './Account';

@modelOptions({
  schemaOptions: { versionKey: false, timestamps: false, _id: false },
  options: {
    allowMixed: 0,
  },
})
class Client {
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
class BranchInfo {
  @prop({ required: true, enum: BranchTypes, type: () => String })
  public type: BranchTypes;

  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public ref: string;
}

@modelOptions({
  schemaOptions: { versionKey: false, timestamps: true, _id: false },
  options: {
    allowMixed: 0,
  },
})
class Log extends TimeStamps {
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
class Tracking {
  @prop({ required: true, type: () => BranchInfo, _id: false })
  public current: BranchInfo;

  @prop({ required: true, type: () => [Log], _id: false })
  public logs: Log[];
}

@modelOptions({
  schemaOptions: { collection: 'package', versionKey: false, timestamps: true, _id: false },
  options: {
    allowMixed: 0,
  },
})
export class Package extends TimeStamps {
  @prop({ required: true, default: () => `MP-${getRandomBase64Id()}` })
  public _id: string;

  @prop({ required: true, enum: PackageTypes, type: () => String })
  public type!: PackageTypes;

  @prop({ required: true, ref: () => Account })
  public creator!: Ref<Account>;

  @prop({ required: true, ref: () => TransactionPoint })
  public sentAt!: Ref<TransactionPoint>;

  @prop({ required: true, ref: () => TransactionPoint })
  public receivedAt!: Ref<TransactionPoint>;

  @prop({ required: true, type: () => Client, _id: false })
  public sender!: Client;

  @prop({ required: true, type: () => Client, _id: false })
  public receiver!: Client;

  @prop({ required: false })
  public description?: string;

  @prop({ required: true, enum: Payer, type: () => String })
  public payer: Payer;

  @prop({ required: true })
  public postages: [
    {
      service: string;
      cost: number;
    },
  ];

  @prop({ required: false })
  public COD?: number;

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
    type: () => Tracking,
    _id: false,
  })
  public tracking!: Tracking;
}
