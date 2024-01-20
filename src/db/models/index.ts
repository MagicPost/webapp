import { getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Account } from './Account';
import { Package } from './Package';
import { CollectionPoint, TransactionPoint } from './Branches';
import { Batch } from './Batch';

export const AccountModel = mongoose.models?.Account || getModelForClass(Account);

export const CollectionPointModel =
  mongoose.models?.CollectionPoint || getModelForClass(CollectionPoint);

export const TransactionPointModel =
  mongoose.models?.TransactionPoint || getModelForClass(TransactionPoint);

export const PackageModel = mongoose.models?.Package || getModelForClass(Package);

export const BatchModel = mongoose.models?.Batch || getModelForClass(Batch);
