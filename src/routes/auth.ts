import { Router } from 'express';
import { registerCtrl, loginCtrl } from '../controllers/auth';
export const router = Router();

router.post('/register', registerCtrl);
router.post('/login', loginCtrl);

