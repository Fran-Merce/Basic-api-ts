import { Request, Response } from 'express';
import { registerNewUser, loginUser } from '../services/auth.service';

const registerCtrl = async ({ body }: Request, res: Response) => {
  const user = await registerNewUser(body);
  res.send(user);
};

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const responseUser = await loginUser({ email, password });
  if (responseUser.error) {
    responseUser.error === 'WRONG_PASSWORD_OR_EMAIL' && res.status(403);
    res.send({ error: responseUser.error });
    return;
  }
  const { token, user } = responseUser;
  res.send({
    message: 'LOGIN_SUCCESS',
    data: {
      token,
      userData: {
        email: user?.email,
        name: user?.name,
        id: user?._id,
      },
    },
  });
};

export { registerCtrl, loginCtrl };
