import { Router } from 'express';
import TaskController from '../controllers/task.controller';
import authMiddleware from '../middleware/auth.middleware'

const router = Router();

router.post('/', authMiddleware, TaskController.createTask);
router.get('/', authMiddleware, TaskController.getTaskByUserId);
router.put('/:id', authMiddleware, TaskController.updateTask);
router.delete('/:id', authMiddleware, TaskController.deleteTask);

export default router;
