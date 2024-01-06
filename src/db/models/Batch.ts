import { BatchStates, BranchTypes } from '@/constants';
import { modelOptions, mongoose, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  schemaOptions: { collection: 'batch', versionKey: false, timestamps: true },
  options: {
    allowMixed: 0,
  },
})
export class Batch extends TimeStamps {
  public _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  public truckId!: string;

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

  @prop({
    required: true,
    type: () => String,
    enum: BatchStates,
    default: BatchStates.IN_TRANSIT,
  })
  public state: BatchStates;
}
