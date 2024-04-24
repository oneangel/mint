import { User, SavingsGoal } from "../models/models.js";

//Create a new savingGoals
export const registerSavingGoals = async (req, res) => {
  console.log(req.body);
  const { description, createdAt, finalDate, amount, amountGoal, username, state } =
    req.body;

  try {

    const idGoal = Math.random().toString(36).slice(2, 10 + 2);

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    const newSavingGoals = new SavingsGoal({
      idGoal, description, createdAt, finalDate, amount, amountGoal, username, state
    });

    const saveSavingGoals = await newSavingGoals.save();
    res.send(saveSavingGoals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete an existing savingGoals
export const deleteSavingGoals = async (req, res) => {
  try {
    const { code } = req.params;

    const existingSavingGoal = await SavingsGoal.findOneAndDelete({ _id: code });

    if (!existingSavingGoal) {
      return res.status(404).send("Savings Goal not found");
    }

    res.send(existingSavingGoal);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting Savings Goal");
  }
};
/* export const deleteSavingGoals = async (req, res) => {
  try {
    const { code } = req.params;

    const existingsavingGoals = await SavingsGoal.findOne({ _id: code });

    if (!existingsavingGoals || existingsavingGoals.state === "false") {
      return res.status(404).send("Savings Goal not found");
    }

    existingsavingGoals.state = false;
    const updatedsavingGoals = await existingsavingGoals.save();
    res.send(updatedsavingGoals);
  } catch (error) {
    res.status(500).send("savingGoals cannot be deleted")
  }
} */

//Update an existing savingGoals
export const updateSavingGoals = async (req, res) => {
  const { code } = req.params;
  const { description, finalDate, amountGoal } =
    req.body;

  try {
    const existingsavingGoals = await SavingsGoal.findOne({ _id: code });

    if (!existingsavingGoals) {
      return res.status(404).send("savingGoals not found");
    }

    existingsavingGoals.description = description;
    existingsavingGoals.finalDate = finalDate;
    existingsavingGoals.amountGoal = amountGoal;

    const updatedsavingGoals = await existingsavingGoals.save();

    res.send(updatedsavingGoals);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const addAmountGoal = async (req, res) => {
  const { code } = req.params;
  const { amount } = req.body;

  try {
    const existingsavingGoals = await SavingsGoal.findOne({ _id: code });

    if (!existingsavingGoals) {
      return res.status(404).send("savingGoals not found");
    }

    existingsavingGoals.amount += amount;

    if (existingsavingGoals.amount >= existingsavingGoals.amountGoal) {
      existingsavingGoals.state = false;
    }

    if (existingsavingGoals.amount > existingsavingGoals.amountGoal) {
      existingsavingGoals.amount = existingsavingGoals.amountGoal;
    }

    const updatedsavingGoals = await existingsavingGoals.save();

    res.send(updatedsavingGoals);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

//Get an existing savingGoals
export const getsavingGoals = async (req, res) => {
  const { code } = req.params;
  try {
    const existingsavingGoals = await SavingsGoal.find({ username: code });

    if (!existingsavingGoals) {
      return res.status(404).send("Saving Goals not found");
    }

    res.send(existingsavingGoals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting Savings Goal info");
  }
};