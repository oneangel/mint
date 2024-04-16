import { meterService } from "../services/services";

export const useGetMeter = async () => {
  try {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const res = await meterService.getMeter(username, token);
    if (localStorage.getItem('serial') === null || localStorage.getItem('serial') === undefined) {
      localStorage.setItem("serial", res.data.serial);
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const useLinkMeter = async (data) => {
  try {
    const username = localStorage.getItem("username");
    const finalData = {
      ...data,
      username: username,
    }
    const token = localStorage.getItem("token");
    const res = await meterService.linkMeter(finalData, token);
    if (localStorage.getItem('serial') === null || localStorage.getItem('serial') === undefined) {
      localStorage.setItem("serial", res.data.meter);
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};