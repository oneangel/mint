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
  },

  lastname: {
    type: String,
    required: true,
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
  },

  meter: {
    type: String,
    default: ""
  },

  avatar: {
    type: String,
    default: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
  }
});

//Es para especificarle a mongoose cual es nuestro modelo
export default mongoose.model("Client", clientSchema);
