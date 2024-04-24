import axios from "axios";

const URL_API = "https://mint-j4lg.onrender.com/api";

export function login(user) {
    return axios.post(`${URL_API}/login/user`, user);
}

export function registerUser(user) {
    return axios.post(`${URL_API}/register/user`, user)
}

export function updateUser(client, data, token) {
    return axios.put(`${URL_API}/update/user/${client}`, data, { headers: { Authorization: token } })
}