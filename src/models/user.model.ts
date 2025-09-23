import { modelOptions, prop, plugin } from '@typegoose/typegoose';
import leanId from 'mongoose-lean-id';

@plugin(leanId)
@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  },
})
export class User {
  @prop({ required: true, trim: true })
  name!: string;

  @prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @prop({ trim: true })
  bio?: string;
}
