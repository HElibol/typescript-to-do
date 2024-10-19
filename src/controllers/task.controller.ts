import { Request, Response } from 'express';
import TaskService from '../services/task.service';
import { ITask } from '../models/task.model';

class TaskController {
    public async createTask(req: Request, res: Response):Promise<void>{
        try {
            const { title } = req.body;
            const userId: string = "6703a6c50d8a58a57a872126";
            const newTask: ITask = await TaskService.createTask({
                title,
                user: userId,
                complated: false 
            } as ITask);
            res.status(201).json({newTask});

        } catch (error) {
            res.status(401).json(error);
        }
    }

    public async getTaskByUserId(req: Request, res: Response):Promise<void>{
        const userId = "6703a6c50d8a58a57a872126";
        try {
            const tasks: ITask[] = await TaskService.getTaskByUserId(userId);
            res.status(200).json(tasks);

        } catch (error) {

            res.status(500).json({ message: 'Görevler alınırken hata oluştu.', error });

        }
    }

    public async updateTask(req: Request, res: Response):Promise<void>{
        try{
            const taskId = req.params.id
            const {title, complated} = req.body;
            const userId = req.user;
            const taskData: ITask = {
                title,
                user: userId, 
                complated
            } as ITask;

            const newTask = await TaskService.updateTask(taskId, taskData);

            res.status(202).json(newTask);

        }catch(error){
            res.status(404).json(error);
        }
    }

    public async deleteTask(req:Request, res:Response):Promise<void>{
        try {
            const taskId = req.params.id;
            const task = await TaskService.deleteTask(taskId);
            res.status(201).json({task, message: "task_delet"});
            
        } catch (error) {
            res.status(404).json(error);
        }
    }

}

export default new TaskController();