import { NextFunction, Response } from 'express';
import { verifyToken } from '../helpers/jwt.handle';
import { RequestWithUser } from '../interfaces/requestWithUser';

export const checkSession = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtByUser =req.headers.authorization || '';
    const jwt = jwtByUser.split(' ').pop();
    const isUser = verifyToken(`${jwt}`);

    if (!isUser)
      return res.status(401).send({ message: 'Unauthorized_invalid_session' });
    req.user = isUser;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid session' });
  }
};
