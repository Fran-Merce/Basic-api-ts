import { encrypt, verified } from '../helpers/bcrypt.handle';
import { GenerateToken } from '../helpers/jwt.handle';
import { Auth } from '../interfaces/auth';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user';

const registerNewUser = async ({ email, password, name }: User) => {
  const checkIsUserExist = await UserModel.findOne({ email });
  const checkIsNameExist = await UserModel.findOne({ name });
  if (checkIsUserExist) return 'Email already exist';
  if (checkIsNameExist) return 'Name already exist';
  const passwordHash = await encrypt(password);
  return await UserModel.create({ email, password: passwordHash, name });
};

const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email });
  if (!checkIs) return { error: 'NOT_FOUND_USER' };
  const passwordHash = checkIs.password;
  const isMatch = await verified({ password, passwordHash });
  if (!isMatch) return { error: 'WRONG_PASSWORD_OR_EMAIL' };
  const token = await GenerateToken(checkIs.email);
  return { token, user: checkIs };
};

export { registerNewUser, loginUser };
