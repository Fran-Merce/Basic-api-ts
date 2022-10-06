import { Schema, model, Model, Types, version } from 'mongoose';
import { Item } from '../interfaces/item.interface';

const ItemSchema = new Schema<Item>(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    toDo: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const ItemModel = model('items', ItemSchema);

