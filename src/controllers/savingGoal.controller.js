import { User, SavingsGoal } from "../models/models.js";

//Create a new savingGoals
export const registerSavingGoals = async (req, res) => {
  console.log(req.body);
  const { idGoal, description, createdAt, finalDate, amount, amountGoal, username, state } =
    req.body;

  try {

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

    const existingsavingGoals = await SavingsGoal.findOneAndDelete({ idGoal: code });

    if (!existingsavingGoals) {
      return res.status(404).send("Savings Goal not found");
    }

    const updatedsavingGoals = await existingsavingGoals.save();
    res.send(updatedsavingGoals);
  } catch (error) {
    res.status(500).send("savingGoals cannot be deleted")
  }
}

//Update an existing savingGoals
export const updateSavingGoals = async (req, res) => {
  const { code } = req.params;
  const { name, createdAt, amount } =
    req.body;

  try {
    const existingsavingGoals = await SavingsGoal.findOne({ idGoal: code });

    if (!existingsavingGoals) {
      return res.status(404).send("savingGoals not found");
    }

    existingsavingGoals.name = name;
    existingsavingGoals.createdAt = createdAt;
    existingsavingGoals.amount = amount;

    const updatedsavingGoals = await existingsavingGoals.save();

    res.send(updatedsavingGoals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Savings Goal cannot be updated");
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