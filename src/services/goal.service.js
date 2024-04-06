import axios from "axios";

const URL_API = "http://localhost:3000/api";

//http://localhost:3000/api/get/goals/Alann
export function getGoals(username, token) {
  return axios.get(`${URL_API}/get/goals/${username}`, { headers: { Authorization: token } })
}