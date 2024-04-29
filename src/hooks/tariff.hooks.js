import { tariffService } from "../services/services";
import { format } from "date-fns";

const currentDate = new Date();
const month = format(currentDate, 'MMMM').toLocaleLowerCase();

export const useGetTariffs = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await tariffService.getTariffs(month, token);
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
