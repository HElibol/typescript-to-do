import { Router } from 'express';
import UserController from '../controllers/auth.controller';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/token', UserController.refreshAccessToken);

export default router;
