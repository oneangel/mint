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
      return res;
    }
    else {
      return "";
    }
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
};

export const useMonthMeasureT = async () => {
  try {
    const serial = localStorage.getItem("serial");
    if (serial != null) {
      const serialUp = serial.replace(/"/g, '');
      const token = localStorage.getItem("token");
      const res = await serviceService.getMonthTempMeasure(serialUp, {
        startDate,
        endDate
      }, token);
      return res;
    }
    else {
      return "";
    }
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

export const useGetServiceList = async (type) => {
  try {
    const serial = localStorage.getItem("serial");
    const token = localStorage.getItem("token");
    const res = await serviceService.getServicesList(serial, {
      startDate,
      endDate,
      type
    }, token);
    console.log("Pepe");
    console.log(res);
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
};