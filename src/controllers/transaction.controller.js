import { User, Transaction } from "../models/models.js";

//Creates a new Transaction
export const registerTransaction = async (req, res) => {
  console.log(req.body);
  const { username, createdAt, description, amount, origin, destination, type, state, status } =
    req.body;

  try {

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    const idTransaction = Math.random().toString(36).slice(2, 10 + 2);

    const newTransaction = new Transaction({
      idTransaction, username, createdAt, description, amount, origin, destination, type, state, status
    });

    const saveTransaction = await newTransaction.save();
    res.send(saveTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Deletes an existing Transaction
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

//Updates an existing Transaction
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

//Gets an existing Transaction
export const getTransaction = async (req, res) => {
  const { code } = req.params;
  try {
    const existingTransaction = await Transaction.findOne({ idTransaction: code });

    if (!existingTransaction || existingTransaction.status === false) {
      return res.status(404).send("Transaction not found");
    }

    res.send(existingTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting Transaction info");
  }
};

//Gets the last three user's transactions
export const getLastTransactions = async (req, res) => {
  try {
    const { code } = req.params;

    const transactions = await Transaction.find({ username: code }).sort({ createdAt: -1 }).limit(3);
    res.json(transactions)
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

//Gets user's transactions list
export const getUserTransactionsList = async (req, res) => {
  const { code } = req.params;

  try {
    const transactionList = await Transaction.find({ username: code });
    res.send(transactionList);
  } catch (error) {
    res.send(error);
  }
};

//Gets user's transactions by date range
export const getUserTransactionsByDateRange = async (req, res) => {
  try {
    const { code } = req.params;
    const { startDate, endDate } = req.body;

    const transactionList = await Transaction.aggregate([
      {
        $match: {
          username: code,
          createdAt: {
            $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)), //It sets the time at 00:00:00:000
            $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)) //It sets the time at 23:59:59:999
          }
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } } //To sort them ascendant
    ])
    res.json(transactionList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' })
  }
};

// Gets user's balance account
export const getBalanceAccount = async (req, res) => {
  try {
    const { code } = req.params;

    const balance = await Transaction.aggregate([
      {
        $match: {
          username: code,
        }
      },
      {
        $group: {
          _id: null,
          balance: { $sum: "$amount" }
        }
      }
    ])
    res.json(balance[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}