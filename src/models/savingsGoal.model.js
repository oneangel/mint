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

  name: {
    type: String,
    required: true,
    validate: validator.isStrongPassword
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
    required: true,
    validate: validator.isFloat
  },

  username: {
    type: String,
    required: true,
    validate: validator.isAlphanumeric
  },

  state: {
    type: String,
    default: "En proceso"
  }
});

//Es para especificarle a mongoose cual es nuestro modelo
export default mongoose.model("SavingsGoal", savingsGoalSchema);
