import { Request, Response, Router } from 'express';
import { deleteItem, getItem, getItems, postItem, updateItenm } from '../controllers/items';
import { logMiddleware } from '../middlewares/log';

const router = Router();

router.get('/all', getItems);
router.get('/:id', logMiddleware,getItem);
router.post('/', postItem);
router.put('/:id', updateItenm);
router.delete('/:id', deleteItem);

export { router };
