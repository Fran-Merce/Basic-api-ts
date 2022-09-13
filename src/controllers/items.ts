import { Request, response, Response } from 'express';
import { handleHttp } from '../helpers/error.handle';
import {
  deleteTodo,
  getTodo,
  getTodos,
  insertTodo,
  updateTodo,
} from '../services/item.service';

const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const responseTodo = await getTodo(id);
    const data = responseTodo ? responseTodo : { ERROR: 'NOT_FOUND' };
    res.send(data);
  } catch (error) {
    handleHttp(res, 'Error on get item');
  }
};
const updateItenm = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    res.send(await updateTodo(id, body));
  } catch (error) {
    handleHttp(res, 'Error on UPDATE item');
  }
};
const postItem = async ({ body }: Request, res: Response) => {
  try {
    const responseTodo = await insertTodo(body);
    res.send(responseTodo);
  } catch (error) {
    handleHttp(res, `error on post item ${error}`);
  }
};
const deleteItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await deleteTodo(id);
    if (!response) return res.send({ ERROR: 'NOT_FOUND' });
    res.send({ message: 'Item deleted' });
  } catch (error) {
    handleHttp(res, 'Error on delete item');
  }
};

const getItems = async (req: Request, res: Response) => {
  try {
    const responseTodo = await getTodos();
    res.send(responseTodo);
  } catch (error) {
    handleHttp(res, 'Error on get itemsd' + error);
  }
};
export { getItem, updateItenm, postItem, deleteItem, getItems };
