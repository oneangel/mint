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
		if (error.response && error.response.status === 401) {
			throw new Error("Token expired or Invalid");
		} else {
			console.log(error);
			throw new Error("Something went wrong");
		}
	}
}

export const useDeleteTransaction = async (id) => {
	try {
		const token = localStorage.getItem("token");
		const res = await transactionService.deleteTransaction(id, token);
		return res;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			throw new Error("Token expired or Invalid");
		} else {
			console.log(error);
			throw new Error("Something went wrong");
		}
	}
}

export const useDeleteFTransaction = async (id) => {
	try {
		const token = localStorage.getItem("token");
		const res = await transactionService.deleteFTransaction(id, token);
		return res;
	} catch (error) {
		console.log(error);
	}
}

export const useRecoverTransaction = async (id) => {
	try {
		const token = localStorage.getItem("token");
		const res = await transactionService.recoverTransaction(id, token);
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
		const token = localStorage.getItem("token");
		const res = await transactionService.getTotalExpenseByDate(username, {
			startDate: startOfMonth(new Date()),
			endDate: endOfMonth(new Date()),
		}, token);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getTotalIncomeByDate = async () => {
	try {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		const res = await transactionService.getTotalIncomeByDate(username, {
			startDate: startOfMonth(new Date()),
			endDate: endOfMonth(new Date()),
		}, token);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getTotalExpense = async () => {
	try {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		const res = await transactionService.getTotalExpense(username, token);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getTotalIncome = async () => {
	try {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		const res = await transactionService.getTotalIncome(username, token);
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