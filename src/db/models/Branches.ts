import mongoose from 'mongoose';
import { postalCodeRegex } from '@/lib/regex';
import type { Ref } from '@typegoose/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Account } from './Account';

abstract class AbstractBranch extends TimeStamps {
  public _id!: mongoose.Schema.Types.ObjectId;

  @prop({
    required: true,
    validate: {
      validator: function (value: string) {
        return postalCodeRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid postal code!`,
    },
  })
  public postalCode!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public address!: string;

  @prop({ required: true })
  public ward!: string;

  @prop({ required: true })
  public district!: string;

  @prop({ required: true })
  public province!: string;

  @prop({ ref: () => Account, required: false })
  public manager?: Ref<Account>;

  @prop({ ref: () => Account, required: false, default: [] })
  public staffs?: Ref<Account>[];
}

////  Collection Point  ////
@modelOptions({
  schemaOptions: {
    collection: 'collection_point',
    timestamps: true,
    versionKey: false,
  },
  options: {
    allowMixed: 0,
  },
})
export class CollectionPoint extends AbstractBranch {
  @prop({ required: true, ref: () => TransactionPoint, default: [] })
  public transactionPoints!: Ref<TransactionPoint>[];

  @prop({ required: true })
  public geolocation!: string;
}

////  Transaction Point  ////
@modelOptions({
  schemaOptions: {
    collection: 'transaction_point',
    timestamps: true,
    versionKey: false,
  },
  options: {
    allowMixed: 0,
  },
})
export class TransactionPoint extends AbstractBranch {
  @prop({ required: true, ref: () => CollectionPoint })
  public collectionPoint!: Ref<CollectionPoint>;
}
