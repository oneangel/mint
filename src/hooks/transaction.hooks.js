import { transactionServices } from "../services/services";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startOfMonth, endOfMonth, format, startOfWeek, endOfWeek } from "date-fns";

export const useGetTE = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const res = await transactionServices.getTotalExpense(user);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const useGetTI = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const res = await transactionServices.getTotalIncome(user);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//It's used to get the last transactions
export const useGetLT = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');
    const res = await transactionServices.getLastTransactions(user, token);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const useGetTL = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');
    const res = await transactionServices.getTransactionsList(user, token);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const useGetB = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');
    const res = await transactionServices.getBalance(user, token);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const useGetIBD = async () => {
  const user = await AsyncStorage.getItem('user');
  const token = await AsyncStorage.getItem('token');
  const today = new Date();
  const startOfMonthDate = startOfWeek(today);
  const endOfMonthDate = endOfWeek(today);
  const res = await transactionServices.getIncomesByDate(user, { startDate: format(startOfMonthDate, "yyyy-MM-dd"), endDate: format(endOfMonthDate, "yyyy-MM-dd") }, token);

  const weeklyTotal = [{ amount: 0, day: "L" }, { amount: 0, day: "M" }, { amount: 0, day: "X" }, { amount: 0, day: "J" }, { amount: 0, day: "V" }, { amount: 0, day: "S" }, { amount: 0, day: "D" }];

  res.data.forEach((transaction) => {
    const dayOfWeek = new Date(transaction._id).getDay();
    weeklyTotal[dayOfWeek].amount += transaction.totalAmount;
  });

  console.log('Semanaaa');
  console.log(weeklyTotal);
  return weeklyTotal;
};

export const useGetEBD = async () => {
  const user = await AsyncStorage.getItem('user');
  const token = await AsyncStorage.getItem('token');
  const today = new Date();
  const startOfMonthDate = startOfWeek(today);
  const endOfMonthDate = endOfWeek(today);
  const res = await transactionServices.getExpensesByDate(user, { startDate: format(startOfMonthDate, "yyyy-MM-dd"), endDate: format(endOfMonthDate, "yyyy-MM-dd") }, token);
  const weeklyTotal = [{ amount: 0, day: "L" }, { amount: 0, day: "M" }, { amount: 0, day: "X" }, { amount: 0, day: "J" }, { amount: 0, day: "V" }, { amount: 0, day: "S" }, { amount: 0, day: "D" }];

  res.data.forEach((transaction) => {
    const dayOfWeek = new Date(transaction._id).getDay();
    weeklyTotal[dayOfWeek].amount += transaction.totalAmount;
  });

  console.log('Semanaaa Gastos');
  console.log(weeklyTotal);
  return weeklyTotal;
};

/* export const useGetIBD = async () => {
  const user = await AsyncStorage.getItem('user');
  const token = await AsyncStorage.getItem('token');
  const today = new Date();
  const startOfMonthDate = startOfMonth(today);
  const endOfMonthDate = endOfMonth(today);
  const res = await transactionServices.getIncomesByDate(user, { startDate: format(startOfMonthDate, "yyyy-MM-dd"), endDate: format(endOfMonthDate, "yyyy-MM-dd") }, token);
  const formatedDate = res.data.map(item => ({
    date: new Date(item._id),
    totalAmount: item.totalAmount
  }))
  console.log(formatedDate);
  return formatedDate;
}; */

export const useAddT = async (transaction) => {
  try {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');
    const finalTransaction = {
      ...transaction,
      amount: Number(transaction["amount"]),
      destination: "Pepe",
      origin: user,
      type: transaction["amount"] > 0 ? "income" : "expense",
      state: "succesfully"
    }
    const res = await transactionServices.addTransaction(user, finalTransaction, token);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const useDT = async (id) => {
  try {
    console.log('Pepe');
    console.log(id);
    const token = await AsyncStorage.getItem('token');
    const res = await transactionServices.deleteTransaction(id, token);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const useUT = async (data) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await transactionServices.updateTransaction(data._id, data, token);
    return res;
  } catch (error) {
    console.log(error);
  }
}