import mongoose from "mongoose";
import validator from "validator";

const savingsGoalSchema = new mongoose.Schema({
  idGoal: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: validator.isAlphanumeric
  },

  description: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    validate: validator.isDate
  },

  finalDate: {
    type: Date,
    required: true,
    validate: validator.isDate
  },

  amount: {
    type: Number,
    default: 0,
  },

  amountGoal: {
    type: Number,
    required: true,
  },

  username: {
    type: String,
    required: true,
    validate: validator.isAlphanumeric
  },

  state: {
    type: Boolean,
    default: true
  }
});

//Es para especificarle a mongoose cual es nuestro modelo
export default mongoose.model("SavingsGoal", savingsGoalSchema);
