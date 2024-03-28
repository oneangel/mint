import { getWeekRange } from "./date.utils";
import { transactionService } from "../services/services";

//It gets transactions data of user by a range time
export const getTransactionsByRange = async (weeksAgo) => {
    const username = localStorage.getItem("username");
    const range = getWeekRange(weeksAgo);
    const res = await transactionService.getTransactionList(username, range);
    const weeklyTotal = [0, 0, 0, 0, 0, 0, 0];

    res.data.forEach((transaction) => {
        const dayOfWeek = new Date(transaction._id).getDay();
        weeklyTotal[dayOfWeek] += transaction.totalAmount;
    });

    console.log(weeklyTotal);

    return weeklyTotal;
};