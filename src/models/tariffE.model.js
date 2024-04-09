import mongoose from "mongoose";
import validator from "validator";

const tariffElectricitySchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    unique: true
  },
  tariffs: {
    basic: {
      cost: {
        type: Number,
        required: true,
      },
      limit: {
        type: Number,
        required: true,
      }
    },
    middle: {
      cost: {
        type: Number,
        required: true,
      },
      limit: {
        type: Number,
        required: true,
      }
    },
    excedent: {
      cost: {
        type: Number,
        required: true,
      }
    }
  },
});

export default mongoose.model("TariffE", tariffElectricitySchema);
