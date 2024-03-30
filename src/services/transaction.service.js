import axios from "axios";

const URL_API = "http://localhost:3000/api";

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

export function getBalance(user, token) {
	return axios.get(`${URL_API}/get/transaction/balance/${user}`,
		{ headers: { Authorization: token } });
}

export function getLastTransactions(user, token) {
	return axios.get(`${URL_API}/get/transaction/last-ones/${user}`,
		{ headers: { Authorization: token } });
}