import { Request, Response } from 'express';
import { handleHttp } from '../helpers/error.handle';

interface Controler {
  req: Request;
  res: Response;
}

const getItem = ({ req, res }: Controler) => {
  try {
  } catch (error) {
    handleHttp(res, 'Error on get item');
  }
};
const updateItenm = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, 'Error on UPDATE item');
  }
};
const postItem = ({ body }: Request, res: Response) => {
  try {
    res.send(body);
  } catch (error) {
    handleHttp(res, 'Error on post item');
  }
};
const deleteItem = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, 'Error on delete item');
  }
};

const getItems = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, 'Error on get items');
  }
};
export { getItem, updateItenm, postItem, deleteItem, getItems };
