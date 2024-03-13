import { User, Transaction } from "../models/models.js";

//Create a new Transaction
export const registerTransaction = async (req, res) => {
  console.log(req.body);
  const { idTransaction, username, createdAt, description, amount, origin, destination, type, state, status } =
    req.body;

  try {

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    const newTransaction = new Transaction({
      idTransaction, username, createdAt, description, amount, origin, destination, type, state, status
    });

    const saveTransaction = await newTransaction.save();
    res.send(saveTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete an existing Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { code } = req.params;

    const existingTransaction = await Transaction.findOne({ idTransaction: code });

    if (!existingTransaction || existingTransaction.status === "false") {
      return res.status(404).send("Transaction not found");
    }

    existingTransaction.status = false;
    const updatedTransaction = await existingTransaction.save();
    res.send(updatedTransaction);
  } catch (error) {
    res.status(500).send("Transaction cannot be deleted")
  }
}

//Update an existing Transaction
export const updateTransaction = async (req, res) => {
  const { code } = req.params;
  const { createdAt, description, amount, origin, destination, type, state, status } =
    req.body;

  try {
    const existingTransaction = await Transaction.findOne({ idTransaction: code });

    if (!existingTransaction) {
      return res.status(404).send("Transaction not found");
    }

    existingTransaction.createdAt = createdAt;
    existingTransaction.description = description;
    existingTransaction.amount = amount;
    existingTransaction.origin = origin;
    existingTransaction.destination = destination;
    existingTransaction.type = type;
    existingTransaction.state = state;
    existingTransaction.status = status;

    const updatedTransaction = await existingTransaction.save();

    res.send(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).send("Transaction cannot be updated");
  }
};

//Get an existing Transaction
export const getTransaction = async (req, res) => {
  const { code } = req.params;
  try {
    const existingTransaction = await User.findOne({ idTransaction: code });

    if (!existingTransaction || existingTransaction.status === false) {
      return res.status(404).send("Transaction not found");
    }

    res.send(existingTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting Transaction info");
  }
};