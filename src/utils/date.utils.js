import { startOfWeek, endOfWeek, format, subWeeks } from "date-fns";

//It gets the range time for chart
export const getWeekRange = (weeksAgo = 0) => {
    const todayDate = subWeeks(new Date(), weeksAgo);
    const startOfWeekDate = startOfWeek(todayDate, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(todayDate, { weekStartsOn: 1 });

    return {
        startDate: format(startOfWeekDate, "yyyy-MM-dd"),
        endDate: format(endOfWeekDate, "yyyy-MM-dd"),
    };
};