import { Router } from 'express';
import TaskController from '../controllers/task.controller';

const router = Router();

router.post('/', TaskController.createTask);
router.get('/', TaskController.getTaskByUserId);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);



export default router;
