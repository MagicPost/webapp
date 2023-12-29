import { ContainerStates } from '@/constants';
import { modelOptions, mongoose, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  schemaOptions: { collection: 'container', versionKey: false, timestamps: true },
  options: {
    allowMixed: 0,
  },
})
export class Container extends TimeStamps {
  public _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  public from: {
    type: string;
    ref: string;
  };

  @prop({ required: true })
  public to: {
    type: string;
    ref: string;
  };

  @prop({
    required: true,
    type: () => String,
    enum: ContainerStates,
    default: ContainerStates.IN_TRANSIT,
  })
  public state: string;
}
