import { clientService } from "../services/services";

export const getClient = async () => {
	try {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		const res = await clientService.getClient(username, token);
		console.log(res);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const useVerifyToken = async () => {
	try {
		const res = await clientService.verifyToken(localStorage.getItem("token"));
		console.log('Autenticado');
		console.log(res);
		return res;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			console.log(error);
			console.log(localStorage.getItem("token"));
			throw new Error("Token expired or Invalid");
		} else {
			console.log(error);
			throw new Error("Something went wrong");
		}
	}
} 