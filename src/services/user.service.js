import axios from "axios";

const URL_API = "http://localhost:3000/api";

export function login(user) {
    return axios.post(`${URL_API}/login/user`, user);
}

export function registerUser(user) {
    return axios.post(`${URL_API}/register/user`, user)
}