import { goalService } from "../services/services";

const username = localStorage.getItem("username");
const token = localStorage.getItem("token");


export const useGetGoalsList = async () => {
  try {
    const res = await goalService.getGoals(username, token);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const useAddGoal = async (goal) => {
  try {
    const finalGoal = {
      ...goal,
      username: username,
    }
    const res = await goalService.addGoal(finalGoal, token);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const useDeleteGoal = async (id) => {
  try {
    const res = await goalService.deleteGoal(id, token);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const useUpdateGoal = async (id) => {
  try {
    console.log(id.selectedItemId);
    const res = await goalService.updateGoal(id.selectedItemId, id.data, token);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}