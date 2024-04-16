import express from "express";
import morgan from "morgan";
import authRoute from "./routers/auth.router.js";
import cors from "cors";

const app = express();
app.use(cors({ origin: 'https://front-mint.onrender.com/', optionsSuccessStatus: 200 }));
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", authRoute);

export default app;
