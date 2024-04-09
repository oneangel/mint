import mongoose from "mongoose";
import validator from "validator";

const tariffWaterSchema = new mongoose.Schema({
  range_from: {
    type: Number,
    required: true
  },

  range_to: {
    type: Number,
    required: true
  },

  percentage: {
    type: Number,
    required: true
  }
});

export default mongoose.model("TariffW", tariffWaterSchema);
