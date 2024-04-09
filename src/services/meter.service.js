import axios from "axios";

const URL_API = "http://localhost:3000/api";

export function getMeter(username, token) {
  return axios.get(`${URL_API}/get/meter/${username}`, { headers: { Authorization: token } })
}