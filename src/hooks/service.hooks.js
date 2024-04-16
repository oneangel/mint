import { serviceService } from "../services/services";
import { startOfMonth, endOfMonth, format } from "date-fns";

const currentDate = new Date();
const month = format(currentDate, 'MMMM').toLocaleLowerCase();
const startDate = startOfMonth(new Date());
const endDate = endOfMonth(new Date());


export const useMonthMeasure = async () => {
  try {
    const serial = localStorage.getItem("serial");
    if (serial != null) {
      const serialUp = serial.replace(/"/g, '');
      const token = localStorage.getItem("token");
      const res = await serviceService.getMonthMeasure(serialUp, {
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

export const useGetTariffCost = async () => {
  try {
    const serial = localStorage.getItem("serial");
    if (serial != null) {
      const serialUp = serial.replace(/"/g, '');
      const token = localStorage.getItem("token");
      const res = await serviceService.getTariffCost(serialUp, {
        startDate,
        endDate,
        month
      }, token);
      return res;
    } else {
      return "";
    }

  } catch (error) {
    console.log(error);
  }
}

export const useGetTariffWCost = async () => {
  try {
    const serial = localStorage.getItem("serial");
    if (serial != null) {
      const serialUp = serial.replace(/"/g, '');
      const token = localStorage.getItem("token");
      const res = await serviceService.getTariffWCost(serialUp, {
        startDate,
        endDate,
      }, token);
      return res;
    } else {
      return "";
    }

  } catch (error) {
    console.log(error);
  }
}