import { goalService } from "../services/services";

export const useGetGoalsList = async () => {
  try {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const res = await goalService.getGoals(username, token);
    return res;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Token expired or Invalid");
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const useAddGoal = async (goal) => {
  try {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const finalGoal = {
      ...goal,
      username: username,
    }
    const res = await goalService.addGoal(finalGoal, token);
    return res;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Token expired or Invalid");
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
}

export const useDeleteGoal = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await goalService.deleteGoal(id, token);
    return res;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Token expired or Invalid");
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
}

export const useUpdateGoal = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await goalService.updateGoal(id.selectedItemId, id.data, token);
    return res;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Token expired or Invalid");
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
}

export const useAddAmountGoal = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const res = await goalService.addAmountGoal(data.selectedItemId, data.amount, token);
    return res;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Token expired or Invalid");
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
}
