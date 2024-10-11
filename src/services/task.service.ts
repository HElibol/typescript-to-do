import TaskRepository from "../repositories/task.repository";
import {ITask} from '../models/task.model';

class TaskService {
        public async createTask(taskData: ITask): Promise<ITask>{
            return await TaskRepository.createTask(taskData);
        }

        public async getTaskByUserId(userId: string): Promise<ITask[]>{
            return await TaskRepository.getTasksByUserId(userId);
        }

        public async updateTask(taskId: string, updateData: Partial<ITask>):Promise<ITask|null>{
            return await TaskRepository.updateTask(taskId, updateData);
        }

        public async deleteTask(taskId: string): Promise<ITask | null> {
            return await TaskRepository.deleteTask(taskId);
        }
        
}

export default new TaskService();