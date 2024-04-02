import { transactionService } from "../services/services";
import { startOfMonth, endOfMonth } from "date-fns";

const username = localStorage.getItem("username");
const token = localStorage.getItem("token");

export const getTransactionList = async () => {
    try {
        const res = await transactionService.getTransactionsList(username, token);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getBalance = async () => {
    try {
        const res = await transactionService.getBalance(username, token);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getTotalExpense = async () => {
    try {
        const res = await transactionService.getTotalExpenseByDate(username, {
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getLastTransactions = async () => {
    try {
        const res = await transactionService.getLastTransactions(username, token);
        return res;
    } catch (error) {
        console.log(error);
    }
};