import TaskModel, {ITask} from '../models/task.model';


class TaskService {
        public async createTask(taskData: ITask): Promise<ITask>{
            const task = new TaskModel(taskData);
            return await task.save();
        }

        public async getTaskByUserId(userId: string): Promise<ITask[]>{
            return await TaskModel.find({user: userId});
        }

        public async updateTask(taskId: string, updateData: Partial<ITask>):Promise<ITask|null>{
            return await TaskModel.findByIdAndUpdate(taskId, updateData, { new: true });        
        }

        public async deleteTask(taskId: string): Promise<ITask | null> {
            return await TaskModel.findByIdAndDelete(taskId);
        }
        
}

export default new TaskService();