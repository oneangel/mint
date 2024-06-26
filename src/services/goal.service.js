import axios from "axios";

const URL_API = "https://mint-j4lg.onrender.com/api";

//http://localhost:3000/api/get/goals/Alann
export function getGoals(username, token) {
  return axios.get(`${URL_API}/get/goals/${username}`, { headers: { Authorization: token } })
}

export function addGoal(goal, token) {
  return axios.post(`${URL_API}/register/goal`, goal, { headers: { Authorization: token } })
}

export function deleteGoal(id, token) {
  return axios.delete(`${URL_API}/delete/goal/${id}`, { headers: { Authorization: token } })
}

export function updateGoal(id, goal, token) {
  return axios.put(`${URL_API}/update/goal/${id}`, goal, { headers: { Authorization: token } })
}

export function addAmountGoal(id, amount, token) {
  console.log('Aqui mi monto' + amount);
  return axios.put(`${URL_API}/add/amount/goal/${id}`, { "amount": amount }, { headers: { Authorization: token } })
}