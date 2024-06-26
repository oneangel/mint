import axios from "axios";

const URL_API = "https://mint-j4lg.onrender.com/api";

export function getTransactionByDate(user, range, token) {
	return axios.post(`${URL_API}/get/transactions/bydate/${user}`, range, {
		headers: {
			Authorization: token
		}
	});
}

export function getTransactionsList(user, token) {
	return axios.get(`${URL_API}/get/user/transactions/${user}`,
		{ headers: { Authorization: token } });
}

export function getIncomesList(user, token) {
	return axios.get(`${URL_API}/get/incomes/list/${user}`,
		{ headers: { Authorization: token } })
}

export function getExpensesList(user, token) {
	return axios.get(`${URL_API}/get/expenses/list/${user}`,
		{ headers: { Authorization: token } })
}

export function getTotalExpenseByDate(user, range, token) {
	return axios.post(`${URL_API}/get/expensesTotal/bydate/${user}`, range, { headers: { Authorization: token } })
}

export function getTotalIncomeByDate(user, range, token) {
	return axios.post(`${URL_API}/get/incomesTotal/bydate/${user}`, range, { headers: { Authorization: token } })
}

export function getTotalExpense(user, token) {
	return axios.get(`${URL_API}/get/expensesTotal/${user}`, { headers: { Authorization: token } })
}

export function getTotalIncome(user, token) {
	return axios.get(`${URL_API}/get/incomesTotal/${user}`, { headers: { Authorization: token } })
}

export function getBalance(user, token) {
	return axios.get(`${URL_API}/get/transaction/balance/${user}`,
		{ headers: { Authorization: token } });
}

export function getLastTransactions(user, token) {
	return axios.get(`${URL_API}/get/transaction/last-ones/${user}`,
		{ headers: { Authorization: token } });
}

export function addTransaction(user, transaction, token) {
	return axios.post(`${URL_API}/register/transaction/${user}`, transaction, { headers: { Authorization: token } })
}

export function deleteTransaction(id, token) {
	console.log(token);
	return axios.put(`${URL_API}/delete/transaction/${id}`, { headers: { Authorization: token } })
}

export function deleteFTransaction(id, token) {
	return axios.delete(`${URL_API}/deleteF/transaction/${id}`, { headers: { Authorization: token } })
}

export function recoverTransaction(id, token) {
	return axios.put(`${URL_API}/recover/transaction/${id}`, { headers: { Authorization: token } })
}

export function updateTransaction(id, transaction, token) {
	return axios.put(`${URL_API}/update/transaction/${id}`, transaction, { headers: { Authorization: token } })
}