import { getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Account } from './Account';
import { Package } from './Package';
import { CollectionPoint } from './Branches';

export const AccountModel = mongoose.models.Account || getModelForClass(Account);

export const CollectionPointModel =
  mongoose.models.CollectionPoint || getModelForClass(CollectionPoint);

export const PackageModel = mongoose.models?.Package || getModelForClass(Package);
