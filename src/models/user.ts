import { Schema, model, Model, Types, version } from 'mongoose';

import { User } from '../interfaces/user.interface';

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: {
    type: String,
    required: false,
    dafaault: 'Make your description 😢',
  },
  age: { type: Number, required: false,  },
});

export const UserModel = model('users', UserSchema);
