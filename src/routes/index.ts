import { Router } from 'express';
import usersRouter from './user.routes';
import taskRouter from './task.routes';
import calenderRouter from './calendar.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/task', taskRouter);
router.use('/calendar', calenderRouter);

export default router;