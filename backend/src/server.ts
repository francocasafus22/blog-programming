import express from "express";
import postRouter from "./routers/postRouter";
import authRouter from "./routers/authRouter";
import userRouter from "./routers/userRouter";
import morgan from "morgan";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/post", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

export default app;
