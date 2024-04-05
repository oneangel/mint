import mongoose from "mongoose";
import validator from "validator";

const transactionSchema = new mongoose.Schema({
  idTransaction: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: validator.isAlphanumeric
  },

  username: {
    type: String,
    required: true,
    trim: true,
    validate: validator.isAlphanumeric
  },

  description: {
    type: String,
    required: true,
    validate: validator.isAlphanumeric,
  },

  amount: {
    type: Number,
    required: true,
  },

  destination: {
    type: String,
    required: true,
    validate: validator.isAlphanumeric
  },

  createdAt: {
    type: Date,
    default: Date.now,
    trim: true,
    validate: validator.isDate
  },

  origin: {
    type: String,
    required: true,
    validate: validator.isAlphanumeric
  },

  type: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
    validate: validator.isAlphanumeric
  },

  status: {
    type: Boolean,
    default: true,
  }
});

//Es para especificarle a mongoose cual es nuestro modelo
export default mongoose.model("Transaction", transactionSchema);
