import { userService } from "../services/services";

export const useLogin = async (data) => {
  try {
    const res = await userService.login(data);
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("username", res.data.username);
    return res;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid credentials");
    } else {
      throw new Error("Something went wrong");
    }
  }
}