import { Schema, model } from 'mongoose';

import { User } from '../interfaces/user.interface';
import { ItemModel } from './task';

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: {
    type: String,
    required: false,
    dafaault: 'Make your description  😢',
  },
  age: { type: Number, required: false },
  tasks: [{ type: ItemModel.schema, required: false, ref: 'tasks' }],
});

export const UserModel = model('users', UserSchema);
