import { transactionService } from "../services/services";
import { startOfMonth, endOfMonth } from "date-fns";

const username = localStorage.getItem("username");
const token = localStorage.getItem("token");

export const useAddTransaction = async (transaction) => {
	try {
		const finalTransaction = {
			...transaction,
			origin: username,
			type: transaction["amount"] > 0 ? "income" : "expense",
			state: "succesfully"
		}
		const res = await transactionService.addTransaction(username, finalTransaction, token);
		return res;
	} catch (error) {
		console.log(error);
	}
}

export const getTransactionList = async () => {
	try {
		const res = await transactionService.getTransactionsList(username, token);
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

export const getTotalExpenseByDate = async () => {
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

export const getTotalExpense = async () => {
	try {
		const res = await transactionService.getTotalExpense(username);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getTotalIncome = async () => {
	try {
		const res = await transactionService.getTotalIncome(username);
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