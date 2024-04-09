import { clientService } from "../services/services";

const username = localStorage.getItem("username");
const token = localStorage.getItem("token");

export const getClient = async () => {
    try {
        const res = await clientService.getClient(username, token);
        return res;
    } catch (error) {
        console.log(error);
    }
};