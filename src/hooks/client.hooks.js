import { clientService, userService } from "../services/services";

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

export const useUpdateClient = async (data) => {
	try {
		const token = localStorage.getItem("token");
		const res1 = await clientService.updateClient(data.username, data, token);
		const res2 = await userService.updateUser(data.username, data, token);
		console.log('Answers');
		console.log(res1);
		console.log(res2);
		return res1;
	} catch (error) {
		console.log(error);
	}
}

export const useUpdateAvatar = async (data) => {
	try {
		const token = localStorage.getItem("token");
		const res = await clientService.updateAvatar(data.username, data.avatar, token);
		console.log(res);
		return res;
	} catch (error) {
		console.log(error);
	}
}