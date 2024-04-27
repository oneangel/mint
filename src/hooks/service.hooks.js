import { startOfMonth, endOfMonth, format } from "date-fns";
import { serviceServices } from "../services/services";
import AsyncStorage from '@react-native-async-storage/async-storage';

const currentDate = new Date();
const startDate = startOfMonth(new Date());
const endDate = endOfMonth(new Date());
const month = format(currentDate, 'MMMM').toLocaleLowerCase();

export const useGetTWC = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const serial = "1234";
    if (serial != null) {
      const res = await serviceServices.getTariffWCost(serial, {
        startDate,
        endDate,
      }, token);
      console.log(res.data);
      return res;
    } else {
      return "";
    }

  } catch (error) {
    console.log(error);
  }
}

export const useMM = async () => {
  try {
    const serial = "1234"
    if (serial != null) {
      const serialUp = serial;
      const token = await AsyncStorage.getItem('token');
      const res = await serviceServices.getMonthMeasure(serialUp, {
        startDate,
        endDate
      }, token);
      console.log(res);
      return res;
    }
    else {
      return "";
    }
  } catch (error) {
    console.log(error);
  }
};

export const useGetTC = async () => {
  try {
    const serial = "1234";
    if (serial != null) {
      const serialUp = serial;
      const token = await AsyncStorage.getItem('token');
      const res = await serviceServices.getTariffCost(serialUp, {
        startDate,
        endDate,
        month
      }, token);
      console.log('Tariff');
      console.log(res.data);
      return res;
    } else {
      return "";
    }

  } catch (error) {
    console.log(error);
  }
}