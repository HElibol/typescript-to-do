import CalendarModel, { ICalendar } from "../models/calendar.model";
import TaskModel from "../models/task.model";
import { Types } from "mongoose";
import { createDaysArray } from "../utils/date.utils";


class CalendarService{
    public async createCalendar(userId: Types.ObjectId, startDate: Date, endDate: Date): Promise<ICalendar>{
    
        const days = createDaysArray(startDate, endDate);
        const newCalendar = new CalendarModel({
            user: userId,
            startDate,
            endDate,
            days
        });
    
        return await newCalendar.save();
    };

    public async assignTaskToDays(
        calendarId: string,
        dayId: string,
        taskId: string,
        userId: Types.ObjectId): Promise<ICalendar>{

            const task = await TaskModel.findOne({ _id: taskId });
            if (!task) throw new Error("Task not found or unauthorized");
            
            const calendar = await CalendarModel.findOneAndUpdate(
                { _id: new Types.ObjectId(calendarId), "days._id":new Types.ObjectId(dayId), user:new Types.ObjectId(userId) },
                { $push: { "days.$.tasks": taskId } },
                { new: true }
            );

            console.log(calendar)

            if(!calendar){
                throw new Error("Calendar not found or unauthorized NULLL!")
            }
            
            return calendar;
    };
        
    public async getCalender(userId: Types.ObjectId): Promise<ICalendar>{

        const calendar = await CalendarModel.findOne({user: userId}).populate({
            path: "days.tasks",
            model: "Task"
        })

        if(!calendar){
            throw new Error("Calendar not found or unauthorized!!")
        }
        
        return calendar;
    }

}

export default new CalendarService();

