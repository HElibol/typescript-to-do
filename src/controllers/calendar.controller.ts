import { Request, Response } from "express";
import CalendarService from "../services/calendar.service";


class CalendarController {

    public async createCalendar(req: Request, res: Response): Promise<void> {
        const { startDate, endDate } = req.body;
        const {userId} = req.user;
    
        try {
            console.log(userId)
            const newCalendar = await CalendarService.createCalendar(userId, new Date(startDate), new Date(endDate));
            res.status(201).json(newCalendar);
        } catch (error) {
            res.status(500).json({ error: "Calendar could not be created." });
        }
    };

    public async assignTaskToDays(req: Request, res: Response): Promise<void>{
        const { calendarId, dayId } = req.params;
        const { taskId } = req.body;
        const {userId} = req.user

        try {
            const updatedCalendar = await CalendarService.assignTaskToDays(calendarId, dayId, taskId, userId);
            if (updatedCalendar) {
                res.status(200).json(updatedCalendar);
            } else {
                res.status(404).json({ error: "Calendar or date not found." });
            }
        } catch (error) {
            res.status(500).json({ error: "Task could not be assigned to the calendar day." });
        }


    }

    public async removeTaskFromDay(req: Request, res: Response): Promise<void> {
        const { calendarId, dayId, taskId } = req.params;
        const { userId } = req.user;

        try {
            const updatedCalendar = await CalendarService.removeTaskFromDay(calendarId, dayId, taskId, userId);
            if (updatedCalendar) {
                res.status(200).json(updatedCalendar);
            } else {
                res.status(404).json({ error: "Calendar or date not found." });
            }
        } catch (error) {
            res.status(500).json({ error: "Task could not be removed from the calendar day." });
        }
    }

    public async getCalendarByUserId(req: Request, res: Response): Promise<void>{

        const {userId} = req.user;

        const calendar = await CalendarService.getCalender(userId);
        
        res.status(201).json(calendar)
    } 

}

export default new CalendarController(); 