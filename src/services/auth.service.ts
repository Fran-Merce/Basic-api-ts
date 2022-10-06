import { encrypt, verified } from '../helpers/bcrypt.handle';
import { GenerateToken } from '../helpers/jwt.handle';
import { Auth } from '../interfaces/auth';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user';

interface returnRegister {
  error?: string;
  user?: User;
}

const registerNewUser = async ({
  email,
  password,
  name,
}: User): Promise<returnRegister> => {
  if (!email || !password || !name) return { error: 'MISSING_DATA' };
  const checkIsUserExist = await UserModel.findOne({ email });
  const checkIsNameExist = await UserModel.findOne({ name });
  if (checkIsUserExist) return { error: 'USER_ALREADY_EXIST' };
  if (checkIsNameExist) return { error: 'NAME_ALREADY_EXIST' };
  const passwordHash = await encrypt(password);
  const UserFromDb = await UserModel.create({ email, password: passwordHash, name });
  return { user: UserFromDb };
};

const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email });
  if (!checkIs) return { error: 'NOT_FOUND_USER' };
  const passwordHash = checkIs.password;
  console.log(passwordHash, password);
  const isMatch = await verified({ password, passwordHash });
  if (!isMatch) return { error: 'WRONG_PASSWORD_OR_EMAIL' };
  const token = await GenerateToken(checkIs.email);
  return { token, user: checkIs };
};

export { registerNewUser, loginUser };
