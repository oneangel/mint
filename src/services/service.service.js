import axios from "axios";

const URL_API = "http://localhost:3000/api";

export function getMonthMeasure(serial, range, token) {
  return axios.post(`${URL_API}/get/totalMonthMeasure/1234`, range, { headers: { Authorization: token } })
}

export function getTariffCost(serial, data, token) {
  return axios.post(`${URL_API}/get/tariff/cost/${serial}`, data, { headers: { Authorization: token } })
}