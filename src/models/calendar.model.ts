import mongoose, {Schema, Document} from "mongoose";
import { ITask } from "./task.model";

export interface ICalendarDay {
    date: Date;
    tasks: ITask[];
}

export interface ICalendar extends Document{
    userID: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    days: ICalendarDay[];
}

const CalendarSchema: Schema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    days: [
        {
            date: { type: Date, required: true },
            tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task"}]
        }
    ]
});
  
const TaskModel = mongoose.model<ICalendar>('Calendar', CalendarSchema);

export default TaskModel;