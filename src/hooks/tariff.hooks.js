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
    console.log(error);
  }
};
