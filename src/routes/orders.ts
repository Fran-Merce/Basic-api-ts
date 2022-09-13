import { Router } from 'express';
import { getItems } from '../controllers/orders';
const router = Router();


router.get('/',getItems)

export {router}