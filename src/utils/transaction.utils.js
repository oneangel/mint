import { getWeekRange } from "./date.utils";
import { transactionService } from "../services/services";

//It gets transactions data of user by a range time
export const getTransactionsByRange = async (weeksAgo) => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem('token');
    const range = getWeekRange(weeksAgo);
    const res = await transactionService.getTransactionByDate(username, range, token);
    const weeklyTotal = [0, 0, 0, 0, 0, 0, 0];

    res.data.forEach((transaction) => {
        const dayOfWeek = new Date(transaction._id).getDay();
        weeklyTotal[dayOfWeek] += transaction.totalAmount;
    });

    return weeklyTotal;
};