import mongoose from 'mongoose';
import type { Ref } from '@typegoose/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';
import { BranchTypes, Roles } from '@/constants/index';
import { CollectionPoint, TransactionPoint } from './Branches';

class BranchDetails {
  @prop({ required: true, enum: BranchTypes })
  type: string;

  @prop({ ref: () => CollectionPoint, required: false })
  collectionPoint?: Ref<CollectionPoint>;

  @prop({ ref: () => TransactionPoint, required: false })
  transactionPoint?: Ref<TransactionPoint>;
}

@modelOptions({
  schemaOptions: { collection: 'accounts', versionKey: false, timestamps: true },
  options: {
    allowMixed: 0,
  },
})
export class Account {
  public _id!: mongoose.Schema.Types.ObjectId;

  @prop({
    type: () => String,
    required: true,
    enum: Roles,
    default: () => Roles.EMPLOYEE,
  })
  public role!: Roles;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: false })
  public username?: string;

  @prop({ required: true, select: false })
  public password!: string;

  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop()
  public phone?: string;

  @prop()
  public avatar?: string;

  @prop({ required: false, type: () => BranchDetails })
  public branch?: BranchDetails;
}
