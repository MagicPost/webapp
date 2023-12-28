import { getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Account } from './Account';
import { Shipment } from './Shipment';
import { CollectionPoint } from './Branches';

export const AccountModel = mongoose.models.Account || getModelForClass(Account);

export const CollectionPointModel =
  mongoose.models.CollectionPoint || getModelForClass(CollectionPoint);

export const ShipmentModel = mongoose.models?.Shipment || getModelForClass(Shipment);
