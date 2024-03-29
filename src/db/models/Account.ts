import mongoose from 'mongoose';
import { modelOptions, prop } from '@typegoose/typegoose';
import { BranchTypes, Gender, Roles } from '@/constants/index';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class BranchDetails {
  @prop({ required: true, enum: BranchTypes })
  type: string;

  @prop({ required: true })
  ref?: string;
}

@modelOptions({
  schemaOptions: {
    collection: 'accounts',
    versionKey: false,
    timestamps: true,
  },
  options: {
    allowMixed: 0,
  },
})
export class Account extends TimeStamps {
  public _id!: mongoose.Schema.Types.ObjectId;

  @prop({
    type: () => String,
    required: true,
    enum: Roles,
    default: () => Roles.STAFF,
  })
  public role!: Roles;

  @prop({ required: true, enum: Gender, type: () => String, default: Gender.MALE })
  public gender!: string;

  @prop({ required: true, unique: true, type: () => String })
  public email!: string;

  @prop({ required: true, select: false })
  public password!: string;

  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true })
  public phone!: string;

  @prop()
  public avatar?: string;

  @prop({ required: false, type: () => BranchDetails, _id: false })
  public branch?: BranchDetails;

  @prop({ required: true, default: false })
  public active!: boolean;
}
