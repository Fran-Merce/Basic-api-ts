import { Response } from 'express';
import { handleHttp } from '../helpers/error.handle';
import { RequestWithUser } from '../interfaces/requestWithUser';
import {
  deleteTodo,
  getTodo,
  getTodos,
  insertTodo,
  updateTodo,
} from '../services/task.service';

const getItem = async (req: RequestWithUser, res: Response) => {
  try {
    const { id } = req.params;
    const responseTodo = await getTodo(id, `${req.headers.user}`);
    const data = responseTodo ? responseTodo : { ERROR: 'NOT_FOUND' };
    res.send(data);
  } catch (error) {
    handleHttp(res, 'Error on get item');
  }
};
const updateItenm = async (
  { params, body, headers }: RequestWithUser,
  res: Response
) => {
  try {
    const { id } = params;
    if (!headers.user) return res.send({ error: 'NOT_FOUND_USER' });
    res.send(await updateTodo(id, body, `${headers.user}`));
  } catch (error) {
    handleHttp(res, 'Error on UPDATE item');
  }
};
const postItem = async ({ body, headers }: RequestWithUser, res: Response) => {
  if (!headers.user) return res.send({ error: 'NOT_FOUND_USER' });
  if (typeof headers.user !== 'string') return res.send({ error: 'ID_NOT_VALID' });
  try {
    const responseTodo = await insertTodo(body, headers.user);
    res.send(responseTodo);
  } catch (error) {
    handleHttp(res, `error on post item ${error}`);
  }
};
const deleteItem = async ({ params, headers }: RequestWithUser, res: Response) => {
  if (!headers.user) return res.send({ error: 'NOT_FOUND_USER' });
  try {
    const { id } = params;
    const response = await deleteTodo(id, `${headers.user}`);
    if (!response) return res.send({ ERROR: 'NOT_FOUND' });
    res.send({ message: 'Item deleted', data: response });
  } catch (error) {
    handleHttp(res, 'Error on delete item');
  }
};

const getItems = async (req: RequestWithUser, res: Response) => {
  if (!req.headers.user) return res.send({ error: 'NOT_FOUND_USER' });
  try {
    const responseTodo = await getTodos(`${req.headers.user}`);
    if (!responseTodo) return res.send({ error: 'NOT_FOUND_USER_OR_ITEMS' });
    res.send(responseTodo);
  } catch (error) {
    handleHttp(res, 'NOT_FOUND_USER_OR_ITEMS');
  }
};
export { getItem, updateItenm, postItem, deleteItem, getItems };
