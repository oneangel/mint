import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: validator.isAlphanumeric
  },

  password: {
    type: String,
    required: true,
    validate: validator.isStrongPassword
  },

  role: {
    type: String,
    default: "client",
    validate: {
      validator: function (value) {
        return value === "client" || value === "admin";
      },
      message: "Role must be client or admin"
    }
  },

  status: {
    type: Boolean,
    default: true,
  },

});

//Es para especificarle a mongoose cual es nuestro modelo
export default mongoose.model("User", userSchema);
