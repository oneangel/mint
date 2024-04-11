import axios from "axios";

const URL_API = "https://mint-j4lg.onrender.com/api";
///link/meter
export function getMeter(username, token) {
  return axios.get(`${URL_API}/get/meter/${username}`, { headers: { Authorization: token } })
}

export function linkMeter(data, token) {
  return axios.put(`${URL_API}/link/meter`, data, { headers: { Authorization: token } })
}