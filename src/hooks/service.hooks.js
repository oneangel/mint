import { serviceService } from "../services/services";
import { startOfMonth, endOfMonth } from "date-fns";

const serial = "1234";
const token = localStorage.getItem("token");

export const useMonthMeasure = async () => {
  try {
    const res = await serviceService.getMonthMeasure(serial, {
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
    }, token);
    console.log('Hola');
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};