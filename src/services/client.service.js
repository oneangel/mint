import axios from "axios";

const URL_API = "http://localhost:3000/api";

export function registerClient(client) {
    return axios.post(`${URL_API}/register/client`, client)
}