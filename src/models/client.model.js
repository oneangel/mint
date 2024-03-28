import mongoose from "mongoose";
import validator from "validator";

const clientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: validator.isAlphanumeric
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail
  },

  phone: {
    type: String,
    default: 0,
    validate: validator.isMobilePhone
  },

  firstname: {
    type: String,
    required: true,
    validate: validator.isAlphanumeric
  },

  lastname: {
    type: String,
    required: true,
  },

  totalExpense: {
    type: Number,
    default: 0,
    //validate: validator.isFloat
  },

  totalIncome: {
    type: Number,
    default: 0,
    //validate: validator.isFloat
  },

  status: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
    validate: validator.isDate
  },

  verify: {
    type: Boolean,
    default: false
  }
});

//Es para especificarle a mongoose cual es nuestro modelo
export default mongoose.model("Client", clientSchema);