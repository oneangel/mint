import axios from "axios";

const URL_API = "http://localhost:3000/api";

export function getTariffs(month, token) {
  return axios.get(`${URL_API}/get/tariff/${month}`, { headers: { Authorization: token } })
}