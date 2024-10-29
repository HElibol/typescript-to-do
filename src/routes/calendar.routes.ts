import { Router } from 'express';
import calendarController from '../controllers/calendar.controller';
import authMiddleware from '../middlewares/auth.middleware'

const router = Router();

router.post('/', authMiddleware, calendarController.createCalendar);
router.put('/:calendarId/days/:dayId/assign-task', authMiddleware, calendarController.assignTaskToDays);

export default router;