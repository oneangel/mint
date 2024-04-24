import { transactionService } from "../services/services";
import { startOfMonth, endOfMonth } from "date-fns";

export const useAddTransaction = async (transaction) => {
	try {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
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

export const useDeleteTransaction = async (id) => {
	try {
		const token = localStorage.getItem("token");
		const res = await transactionService.deleteTransaction(id, token);
		return res;
	} catch (error) {
		console.log(error);
	}
}

export const useUpdateTransaction = async (data) => {
	try {
		const token = localStorage.getItem("token");
		const res = await transactionService.updateTransaction(data.id, data.transaction, token);
		return res;
	} catch (error) {
		console.log(error);
	}
}

export const getTransactionList = async () => {
	try {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		const res = await transactionService.getTransactionsList(username, token);
		console.log(res);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const useGetIncomesList = async () => {
	try {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		const res = await transactionService.getIncomesList(username, token);
		console.log(res);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const useGetExpensesList = async () => {
	try {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		const res = await transactionService.getExpensesList(username, token);
		return res;
	} catch (error) {
		console.log(error);
	}
}

export const getBalance = async () => {
	try {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		const res = await transactionService.getBalance(username, token);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getTotalExpenseByDate = async () => {
	try {
		const username = localStorage.getItem("username");
		const res = await transactionService.getTotalExpenseByDate(username, {
			startDate: startOfMonth(new Date()),
			endDate: endOfMonth(new Date()),
		});
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getTotalIncomeByDate = async () => {
	try {
		const username = localStorage.getItem("username");
		const res = await transactionService.getTotalIncomeByDate(username, {
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
		const username = localStorage.getItem("username");
		const res = await transactionService.getTotalExpense(username);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getTotalIncome = async () => {
	try {
		const username = localStorage.getItem("username");
		const res = await transactionService.getTotalIncome(username);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getLastTransactions = async () => {
	try {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		const res = await transactionService.getLastTransactions(username, token);
		return res;
	} catch (error) {
		console.log(error);
	}
};