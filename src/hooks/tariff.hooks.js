import { tariffService } from "../services/services";
import { format } from "date-fns";

const currentDate = new Date();
const month = format(currentDate, 'MMMM').toLocaleLowerCase();
const token = localStorage.getItem("token");


export const useGetTariffs = async () => {
  try {
    const res = await tariffService.getTariffs(month, token);
    console.log('Holaaaaaaaaaaaa');
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
