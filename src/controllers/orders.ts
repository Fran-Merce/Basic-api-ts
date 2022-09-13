import { Request, Response } from 'express';
import { handleHttp } from '../helpers/error.handle';

export const getItems = (req: Request, res: Response) => {
  try {
    res.send({
      data: 'VALIDATE WITH JWT',
    });
  } catch (error) {
    handleHttp(res, 'Error on get items');
  }
};
