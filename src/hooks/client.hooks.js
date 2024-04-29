import { clientService, userService } from "../services/services";

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

export const useVerifyToken = async () => {
	try {
		const res = await clientService.verifyToken(localStorage.getItem("token"));
		return res;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			console.log(error);
			console.log(localStorage.getItem("token"));
			throw new Error("Token expired or Invalid");
		} else {
			console.log(error);
			console.log('Peponcio');
			throw new Error("Something went wrong");
		}
	}
}

export const useVerifyUsername = async () => {
	try {
		const res = await clientService.verifyUsername(localStorage.getItem("username"));
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
		const user = localStorage.getItem("username");
		const res1 = await clientService.updateClient(user, data, token);
		return res1;
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

export const useUpdateAvatar = async (data) => {
	try {
		const token = localStorage.getItem("token");
		const res = await clientService.updateAvatar(data.username, data.avatar, token);
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