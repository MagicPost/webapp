import type { Ref } from '@typegoose/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';
import { TransactionPoint } from './Branches';
import { Payer, ShipmentStates } from '@/constants';

class Client {
  public fullname: string;
  public address: string;
  public phone: string;
  public email: string;
}

@modelOptions({
  schemaOptions: { collection: 'shipment', versionKey: false, timestamps: true },
  options: {
    allowMixed: 0,
  },
})
export class Shipment extends TimeStamps {
  public _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true, ref: () => TransactionPoint })
  public sentAt!: Ref<TransactionPoint>;

  @prop({ required: true, ref: () => TransactionPoint })
  public receivedAt!: Ref<TransactionPoint>;

  @prop({ required: true, type: () => Client })
  public sender!: Client;

  @prop({ required: true, type: () => Client })
  public receiver!: Client;

  @prop({ required: false })
  public description?: string;

  @prop({ required: true, enum: Payer })
  public payer: string;

  @prop({ required: true })
  public postages: [
    {
      service: string;
      cost: number;
      currency: string;
    },
  ];

  @prop({ required: false })
  public COD?: {
    amount: number;
    currency: string;
  };

  @prop({ required: true })
  public items: [
    {
      name: string;
      quantity: number;
      weight: number;
      currency: string;
      value: number;
    },
  ];

  @prop({ required: true, enum: ShipmentStates, default: ShipmentStates.PENDING })
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
