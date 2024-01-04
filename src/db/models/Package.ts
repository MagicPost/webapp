import type { Ref } from '@typegoose/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { TransactionPoint } from './Branches';
import { Payer, PackageStates, PackageTypes } from '@/constants';
import { getRandomBase64Id } from '@/lib/random';
import { Account } from './Account';

class Client {
  public fullname: string;
  public address: string;
  public phone: string;
  public email: string;
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

  @prop({ required: true, enum: PackageStates, default: PackageStates.PENDING })
  public state: string;

  @prop({ required: true })
  public tracking!: [
    {
      branchType: string;
      branchName: string;
      branchId: string;
      time: Date;
    },
  ];
}
