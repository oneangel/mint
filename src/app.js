import express from "express";
import morgan from "morgan";
import authRoute from "./routers/auth.router.js";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(morgan("dev"));
app.use(express.json());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploadsImage'
}));

app.use("/api", authRoute);

export default app;
