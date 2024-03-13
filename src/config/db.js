import mongoose from "mongoose";
const MONGO_URL = "mongodb://localhost:27017/mint_test_db";

//Este archivo es para crear la conexion a base de datos
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connect DB");
  } catch (error) {
    console.log(err);
  }
};
