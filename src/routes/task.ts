import { Router } from 'express';
import {
  deleteItem,
  getItem,
  getItems,
  postItem,
  updateItenm,
} from '../controllers/items';
import { checkSession } from '../middlewares/session';

const router = Router();

router.get('/all', checkSession, getItems);
router.get('/:id', checkSession, getItem);
router.post('/', checkSession, postItem);
router.put('/:id', checkSession, updateItenm);
router.delete('/:id', checkSession, deleteItem);

export { router };
