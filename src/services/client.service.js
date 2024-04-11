import axios from "axios";

const URL_API = "https://mint-j4lg.onrender.com/api";

export function registerClient(client) {
    return axios.post(`${URL_API}/register/client`, client)
}

export function getClient(client, token) {
    return axios.get(`${URL_API}/get/client/${client}`, { headers: { Authorization: token } })
}