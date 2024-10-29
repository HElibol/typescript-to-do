import { ICalendarDay } from "../models/calendar.model";

export const createDaysArray = (startDate: Date, endDate: Date): ICalendarDay[] => {
    const days: ICalendarDay[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        days.push({
            date: new Date(currentDate),
            tasks: [] 
        });
        currentDate.setDate(currentDate.getDate() + 1); 
    }

    return days;
};
