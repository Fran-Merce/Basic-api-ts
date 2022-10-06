import { NextFunction, Response } from 'express';
import { verifyToken } from '../helpers/jwt.handle';
import { RequestWithUser } from '../interfaces/requestWithUser';
import { JwtPayload } from 'jsonwebtoken';
import { getUser } from '../services/task.service';

export const checkSession = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: 'No token provided' });
    const jwtByUser = req.headers.authorization as string;
    const jwt = jwtByUser.split(' ').pop();
    const isUser = verifyToken(`${jwt}`);
    if (typeof isUser === 'string') return res.send({ error: 'NOT_FOUND_USER' });
    const userEmail = isUser.id || '';
    const userOnDb = await getUser(req.headers.user);

    if (!userOnDb) return res.status(400).send({ error: 'NOT_FOUND_USER' });

    if (userEmail !== userOnDb.email)
      return res.send({ error: 'USER_AUTH_AND_USER_ID_ARE_DIFFERENTS' });

    if (!isUser)
      return res.status(401).send({ message: 'Unauthorized_invalid_session' });
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid session' });
  }
};
