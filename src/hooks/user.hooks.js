import { userServices } from "../services/services";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = async (data) => {
  try {
    const res = await userServices.login(data);
    await AsyncStorage.setItem('user', res.data.username.trim());
    await AsyncStorage.setItem('token', res.data.token);
    return res;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid credentials");
    } else {
      console.log(data);
      throw new Error("Something went wrong" + error);
    }
  }
}