import mongoose from "mongoose";
import validator from "validator";

const serviceSchema = new mongoose.Schema({
  serial: {
    type: String,
    required: true,
    validate: validator.isAlphanumeric
  },

  measurement: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
    validate: validator.isDate
  },

});

//Es para especificarle a mongoose cual es nuestro modelo
export default mongoose.model("Service", serviceSchema);
