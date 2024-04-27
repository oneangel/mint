import { goalServices } from "../services/services";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetGL = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');
    const res = await goalServices.getGoals(user, token);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const useAddG = async (goal) => {
  try {
    console.log(goal);
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');
    const finalGoal = {
      ...goal,
      username: user,
      amount: 0
    }
    console.log(finalGoal);
    const res = await goalServices.addGoal(finalGoal, token);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const useDG = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await goalServices.deleteGoal(id, token);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const useUG = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await goalServices.updateGoal(id.selectedItemId, id.data, token);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const useAAG = async (data) => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log("Monto actualizado:");
    console.log(data);
    const res = await goalServices.addAmountGoal(data._id, data.amount, token);
    console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
}