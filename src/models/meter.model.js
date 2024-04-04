import mongoose from "mongoose";
import validator from "validator";

const meterSchema = new mongoose.Schema({
  serial: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: validator.isAlphanumeric
  },

  type: {
    type: String,
    required: true,
    unique: true,
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

  user: {
    type: String,
    default: ""
  }
});

//Es para especificarle a mongoose cual es nuestro modelo
export default mongoose.model("Meter", meterSchema);
