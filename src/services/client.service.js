import axios from "axios";

const URL_API = "https://mint-j4lg.onrender.com/api";

export function registerClient(client) {
	return axios.post(`${URL_API}/register/client`, client)
}

export function getClient(client, token) {
	return axios.get(`${URL_API}/get/client/${client}`, { headers: { Authorization: token } })
}

export function verifyToken(token) {
	return axios.get(`${URL_API}/verify-token`, { headers: { Authorization: token } })
}

export function updateClient(client, data, token) {
	console.log(data);
	return axios.put(`${URL_API}/update/client/${client}`, data, { headers: { Authorization: token } })
}

export function updateAvatar(client, file, token) {
	const formData = new FormData();

	formData.append('image', file);

	return axios.put(`${URL_API}/update/imageProfile/${client}`, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })
}