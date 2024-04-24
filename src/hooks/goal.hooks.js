import { goalServices } from "../services/services";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetGL = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');
    const res = await goalServices.getGoals(user, token);
    console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
};