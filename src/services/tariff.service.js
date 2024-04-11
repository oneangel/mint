import axios from "axios";

const URL_API = "https://mint-j4lg.onrender.com/api";

export function getTariffs(month, token) {
  return axios.get(`${URL_API}/get/tariff/${month}`, { headers: { Authorization: token } })
}