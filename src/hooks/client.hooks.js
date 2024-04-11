import { clientService } from "../services/services";

export const getClient = async () => {
    try {
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const res = await clientService.getClient(username, token);
        return res;
    } catch (error) {
        console.log(error);
    }
};