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

export function getTotalExpenseByDate(user, range) {
	return axios.post(`${URL_API}/get/expensesTotal/bydate/${user}`, range)
}

export function getTotalIncomeByDate(user, range) {
	return axios.post(`${URL_API}/get/incomesTotal/bydate/${user}`, range)
}

export function getTotalExpense(user) {
	return axios.get(`${URL_API}/get/expensesTotal/${user}`)
}

export function getTotalIncome(user) {
	return axios.get(`${URL_API}/get/incomesTotal/${user}`)
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
	return axios.put(`${URL_API}/delete/transaction/${id}`, { headers: { Authorization: token } })
}

export function updateTransaction(id, transaction, token) {
	return axios.put(`${URL_API}/update/transaction/${id}`, transaction, { headers: { Authorization: token } })
}