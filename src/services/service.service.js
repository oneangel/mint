import axios from "axios";

const URL_API = "http://localhost:3000/api";

export function getMonthMeasure(serial, range, token) {
  return axios.post(`${URL_API}/get/totalMonthMeasure/${serial}`, range, { headers: { Authorization: token } })
}

export function getTariffCost(serial, data, token) {
  return axios.post(`${URL_API}/get/tariff/cost/${serial}`, data, { headers: { Authorization: token } })
}

export function getTariffWCost(serial, data, token) {
  return axios.post(`${URL_API}/get/tariff/water/cost/${serial}`, data, { headers: { Authorization: token } })
}
