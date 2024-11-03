import { Router } from 'express';
import UserController from '../controllers/auth.controller';
import limiter from '../middlewares/rateLimiter';
import auth from '../middlewares/auth.middleware';
import { validateRequest } from '../validation/validateRequest';    
import { userSchema } from '../validation/userValidation';

const router = Router();

router.post('/register',validateRequest(userSchema), UserController.register);
router.post('/login',limiter, UserController.login);
router.post('/token', UserController.refreshAccessToken);
router.post('/logout',auth, UserController.logout);

export default router;
