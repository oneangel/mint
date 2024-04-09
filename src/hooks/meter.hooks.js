import { meterService } from "../services/services";

const username = localStorage.getItem("username");
const token = localStorage.getItem("token");

export const useGetMeter = async () => {
  try {
    const res = await meterService.getMeter(username, token);
    const serial = res.data.serial;
    if (localStorage.getItem('serial') === null) {
      localStorage.setItem("serial", serial);
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};