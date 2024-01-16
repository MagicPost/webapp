import { BatchStates, BranchTypes } from '@/constants';
import { Ref, modelOptions, mongoose, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Package } from './Package';
import { getRandomIdWithPrefix } from '@/lib/random';

@modelOptions({
  schemaOptions: { collection: 'batch', versionKey: false, timestamps: true },
  options: {
    allowMixed: 0,
  },
})
export class Batch extends TimeStamps {
  @prop({ required: true, type: () => String, default: () => getRandomIdWithPrefix('B-', 3) })
  public _id: string;

  @prop({ required: true })
  public truckCode!: string;

  @prop({ required: true })
  public from: {
    type: BranchTypes;
    name: string;
    ref: string;
  };

  @prop({ required: true })
  public to: {
    type: BranchTypes;
    name: string;
    ref: string;
  };

  @prop({ required: true, ref: () => Package, default: [], type: () => [String] })
  public packages: Ref<Package, string>[];

  @prop({
    required: true,
    type: () => String,
    enum: BatchStates,
    default: BatchStates.PENDING,
  })
  public state: BatchStates;

  @prop({ required: false })
  public sentTime: Date;

  @prop({ required: false })
  public receivedTime: Date;
}
