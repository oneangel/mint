import { goalService } from "../services/services";

const username = localStorage.getItem("username");
const token = localStorage.getItem("token");


export const useGetGoalsList = async () => {
  try {
    const res = await goalService.getGoals(username, token);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};