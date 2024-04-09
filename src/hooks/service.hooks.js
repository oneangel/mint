import { serviceService } from "../services/services";
import { startOfMonth, endOfMonth, format } from "date-fns";

const currentDate = new Date();
const month = format(currentDate, 'MMMM').toLocaleLowerCase();

const serial = "1234";
const token = localStorage.getItem("token");
const startDate = startOfMonth(new Date());
const endDate = endOfMonth(new Date());

export const useMonthMeasure = async () => {
  try {
    const res = await serviceService.getMonthMeasure(serial, {
      startDate,
      endDate
    }, token);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const useGetTariffCost = async () => {
  try {
    const res = await serviceService.getTariffCost("1234", {
      startDate,
      endDate,
      month
    }, token);
    return res;
  } catch (error) {
    console.log(error);
  }
}
