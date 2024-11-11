import { Router } from 'express';
import calendarController from '../controllers/calendar.controller';
import authMiddleware from '../middlewares/auth.middleware'

const router = Router();

router.post('/', authMiddleware, calendarController.createCalendar);
router.put('/:calendarId/days/:dayId/assign-task', authMiddleware, calendarController.assignTaskToDays);
router.delete('/:calendarId/days/:dayId/tasks/:taskId', authMiddleware, calendarController.removeTaskFromDay);
router.get('/', authMiddleware, calendarController.getCalendarByUserId);

export default router;