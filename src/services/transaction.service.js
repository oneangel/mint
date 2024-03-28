import axios from "axios";

const URL_API = "http://localhost:3000/api";

//{ headers: { Authorization: accessToken } }
export function getTransactionList(user, range) {
    return axios.post(`${URL_API}/get/transactions/bydate/${user}`, range);
}