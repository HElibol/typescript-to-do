import { Router } from 'express';
import usersRouter from './user.routes';
import taskRouter from './task.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/task', taskRouter);

export default router;